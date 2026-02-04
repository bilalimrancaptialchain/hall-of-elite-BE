"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrchestratorService = void 0;
const metrics_1 = require("../scoring/metrics");
const eligibility_1 = require("../scoring/eligibility");
const engine_1 = require("../scoring/engine");
const tiers_1 = require("../scoring/tiers");
const ranking_1 = require("../scoring/ranking");
const snapshots_1 = require("../snapshots");
const tier_types_1 = require("../scoring/tiers/tier.types");
const orchestrator_utils_1 = require("./orchestrator.utils");
const validation_1 = require("../scoring/validation");
const DEFAULT_MAX_ATTEMPTS_PER_TRADER = 1;
const DEFAULT_BATCH_SIZE = 100;
class OrchestratorService {
    constructor(snapshotService = new snapshots_1.SnapshotService()) {
        this.snapshotService = snapshotService;
    }
    async runPipeline(input, options = {}) {
        const maxAttempts = options.maxAttemptsPerTrader ?? DEFAULT_MAX_ATTEMPTS_PER_TRADER;
        const batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
        const batches = (0, orchestrator_utils_1.splitIntoBatches)(input.traders, batchSize);
        const processed = [];
        for (const batch of batches) {
            // Process each trader independently to isolate failures.
            const results = await Promise.all(batch.map((trader) => (0, orchestrator_utils_1.withRetry)(() => this.processTrader(trader), maxAttempts).catch((error) => this.toFailedResult(trader, error))));
            processed.push(...results);
        }
        const rankedProcessed = this.applyRanking(processed);
        const snapshotId = await this.persistSnapshotIfAny(input, rankedProcessed);
        const summary = this.buildSummary(input, rankedProcessed);
        return {
            runKey: input.runKey,
            snapshotId,
            summary,
            traders: rankedProcessed,
        };
    }
    async processTrader(trader) {
        if (trader.trades.length === 0) {
            return {
                traderId: trader.traderId,
                externalTraderId: trader.externalTraderId,
                status: "invalid",
                score: null,
                tier: null,
                rank: null,
                metrics: null,
                errors: ["No trades provided"],
            };
        }
        // Derive metrics from raw trades
        const metrics = (0, metrics_1.deriveTraderMetrics)(trader.trades);
        // Validate trader + trades + metrics
        const validationResult = (0, validation_1.validateTraderData)({
            id: trader.traderId,
            status: "ACTIVE",
            metadata: {},
        }, trader.trades.map((t, index) => ({
            id: t.id ?? index,
            symbol: "", // symbol not available in TradeLike; left blank intentionally
            volume: 1, // neutral default; structural validation only
            openTime: t.openTime,
            closeTime: t.closeTime ?? null,
            profit: t.profit ?? null,
            fees: t.fees ?? null,
        })), {
            profitFactor: metrics.performance.profitFactor,
            winRatePct: metrics.performance.winRatePct,
            drawdownPct: metrics.risk.maxDrawdownPct,
            totalTrades: metrics.activity.totalTrades,
            totalTradingDays: metrics.activity.tradingDays,
            grossProfit: metrics.performance.totalProfit,
            grossLoss: metrics.performance.totalLoss,
        });
        if (!validationResult.valid) {
            return {
                traderId: trader.traderId,
                externalTraderId: trader.externalTraderId,
                status: "invalid",
                score: null,
                tier: null,
                rank: null,
                metrics,
                errors: validationResult.errors.map((e) => e.code),
            };
        }
        // Eligibility gate
        const eligibility = (0, eligibility_1.checkEligibility)({
            tradingDays: metrics.activity.tradingDays,
            totalTrades: metrics.activity.totalTrades,
            profitFactor: metrics.performance.profitFactor,
            drawdownPct: metrics.risk.maxDrawdownPct,
            winRatePct: metrics.performance.winRatePct,
        });
        if (!eligibility.eligible) {
            return {
                traderId: trader.traderId,
                externalTraderId: trader.externalTraderId,
                status: "ineligible",
                score: null,
                tier: null,
                rank: null,
                metrics,
                eligibilityReasons: eligibility.failedRules.map((r) => r.code),
            };
        }
        // Scoring engine
        const scoreResult = (0, engine_1.calculateScore)({
            profitFactor: metrics.performance.profitFactor,
            winRatePct: metrics.performance.winRatePct,
            drawdownPct: metrics.risk.maxDrawdownPct,
            tradingDays: metrics.activity.tradingDays,
            totalTrades: metrics.activity.totalTrades,
        });
        const score = scoreResult.totalScore;
        // Tier resolver
        const tierResult = (0, tiers_1.assignTierFromScore)(score);
        return {
            traderId: trader.traderId,
            externalTraderId: trader.externalTraderId,
            status: "success",
            score,
            tier: tierResult.tier,
            rank: null, // populated after global ranking
            metrics,
        };
    }
    toFailedResult(trader, error) {
        return {
            traderId: trader.traderId,
            externalTraderId: trader.externalTraderId,
            status: "failed",
            score: null,
            tier: null,
            rank: null,
            metrics: null,
            errors: [error instanceof Error ? error.message : "Unknown error"],
        };
    }
    applyRanking(traders) {
        const eligible = traders.filter((t) => t.status === "success" && t.score !== null);
        if (eligible.length === 0) {
            return traders;
        }
        const ranked = (0, ranking_1.rankTraders)(eligible.map((t) => ({
            traderId: t.traderId,
            score: t.score ?? 0,
            profitFactor: t.metrics?.performance.profitFactor,
            drawdownPct: t.metrics?.risk.maxDrawdownPct,
        })));
        const rankById = new Map(ranked.map((t) => [t.traderId, t.rank]));
        return traders.map((t) => t.status === "success" && t.score !== null
            ? {
                ...t,
                rank: rankById.get(t.traderId) ?? null,
            }
            : t);
    }
    async persistSnapshotIfAny(input, traders) {
        const successful = traders.filter((t) => t.status === "success" && t.rank !== null);
        if (successful.length === 0) {
            return null;
        }
        const metadata = {
            runKey: input.runKey,
            version: snapshots_1.SnapshotVersion.V1,
            label: input.label,
            generatedAt: input.generatedAt,
        };
        const snapshotTraders = successful.map((t) => ({
            traderId: t.traderId,
            externalTraderId: t.externalTraderId,
            score: t.score ?? 0,
            rank: t.rank ?? 0,
            tier: (t.tier ?? tier_types_1.TierLevel.BRONZE),
            metrics: {
                profitFactor: t.metrics?.performance.profitFactor ?? 0,
                winRatePct: t.metrics?.performance.winRatePct ?? 0,
                drawdownPct: t.metrics?.risk.maxDrawdownPct ?? 0,
                tradingDays: t.metrics?.activity.tradingDays ?? 0,
                totalTrades: t.metrics?.activity.totalTrades ?? 0,
            },
            badges: {
                phoenixAddOn: false,
                payoutBoost: false,
                cashback: false,
                merchandise: false,
            },
        }));
        const snapshot = await this.snapshotService.persistSnapshot(metadata, snapshotTraders);
        return snapshot.id;
    }
    buildSummary(input, traders) {
        const total = input.traders.length;
        const processed = traders.length;
        const successful = traders.filter((t) => t.status === "success").length;
        const ineligible = traders.filter((t) => t.status === "ineligible").length;
        const invalid = traders.filter((t) => t.status === "invalid").length;
        const failed = traders.filter((t) => t.status === "failed").length;
        return {
            total,
            processed,
            successful,
            ineligible,
            invalid,
            failed,
        };
    }
}
exports.OrchestratorService = OrchestratorService;
//# sourceMappingURL=orchestrator.service.js.map
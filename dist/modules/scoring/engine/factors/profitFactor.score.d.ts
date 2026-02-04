import { ScoreFactorResult, ScoringMetrics } from "../score.types";
/**
 * Profit factor scoring.
 *
 * - PF < min -> 0
 * - PF between [min, max] -> 0–100
 * - PF > max -> asymptotically capped near 100 to prevent whales from dominating.
 */
export declare const scoreProfitFactor: (metrics: ScoringMetrics) => ScoreFactorResult;
//# sourceMappingURL=profitFactor.score.d.ts.map
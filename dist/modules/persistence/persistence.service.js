"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceService = void 0;
const client_1 = require("./prisma/client");
const logger_1 = require("./logger");
const persistence_dto_1 = require("./persistence.dto");
const persistence_repository_1 = require("./persistence.repository");
const DEFAULT_CURRENCY = "USD";
const DEFAULT_LEVERAGE = 100;
const DEFAULT_STATUS = "UNKNOWN";
const sanitizeString = (value) => {
    if (!value) {
        return null;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
};
const normalizeStatus = (status) => {
    const cleaned = sanitizeString(status);
    if (!cleaned) {
        return DEFAULT_STATUS;
    }
    return cleaned.toUpperCase();
};
const normalizeCurrency = (currency) => {
    const cleaned = sanitizeString(currency);
    return cleaned ? cleaned.toUpperCase() : DEFAULT_CURRENCY;
};
const normalizeLeverage = (leverage) => {
    if (typeof leverage !== "number" || !Number.isFinite(leverage) || leverage <= 0) {
        return DEFAULT_LEVERAGE;
    }
    return Math.round(leverage);
};
const normalizeBalance = (balance) => {
    if (!Number.isFinite(balance)) {
        return 0;
    }
    return Math.round(balance * 100) / 100;
};
const normalizeLogin = (login) => String(login).trim();
const buildSummary = () => ({
    tradersInserted: 0,
    tradersUpdated: 0,
    accountsInserted: 0,
    accountsUpdated: 0,
    tradesInserted: 0,
    tradesUpdated: 0,
    metricsInserted: 0,
    metricsUpdated: 0,
    skippedRecords: 0,
});
class PersistenceService {
    constructor(repository) {
        this.repository = repository ?? new persistence_repository_1.PersistenceRepository(client_1.prisma);
    }
    normalizeMt5Users(rawUsers) {
        const tradersByExternalId = new Map();
        const accountsByExternalId = new Map();
        let skipped = 0;
        for (const raw of rawUsers) {
            const parsed = persistence_dto_1.mt5RawUserSchema.safeParse(raw);
            if (!parsed.success) {
                skipped += 1;
                continue;
            }
            const user = parsed.data;
            const externalId = normalizeLogin(user.login);
            const name = sanitizeString(user.name) ?? `Trader ${externalId}`;
            const accountStatus = normalizeStatus(user.status);
            const traderCandidate = {
                externalId,
                name,
                accountStatus,
            };
            const traderValidated = persistence_dto_1.mt5TraderSchema.safeParse(traderCandidate);
            if (!traderValidated.success) {
                skipped += 1;
                continue;
            }
            tradersByExternalId.set(externalId, traderValidated.data);
            const accountCandidate = {
                externalId,
                traderExternalId: externalId,
                balance: normalizeBalance(user.balance),
                leverage: normalizeLeverage(user.leverage ?? undefined),
                currency: normalizeCurrency(user.currency ?? undefined),
                status: accountStatus,
            };
            const accountValidated = persistence_dto_1.mt5AccountSchema.safeParse(accountCandidate);
            if (!accountValidated.success) {
                skipped += 1;
                continue;
            }
            accountsByExternalId.set(externalId, accountValidated.data);
        }
        return {
            payload: {
                traders: Array.from(tradersByExternalId.values()),
                accounts: Array.from(accountsByExternalId.values()),
                trades: [],
                metrics: [],
            },
            skipped,
        };
    }
    async persistNormalizedPayload(payload) {
        const summary = buildSummary();
        const accountsByTrader = new Map();
        for (const account of payload.accounts) {
            const list = accountsByTrader.get(account.traderExternalId) ?? [];
            list.push(account);
            accountsByTrader.set(account.traderExternalId, list);
        }
        const tradesByAccount = new Map();
        for (const trade of payload.trades) {
            const list = tradesByAccount.get(trade.accountExternalId) ?? [];
            list.push(trade);
            tradesByAccount.set(trade.accountExternalId, list);
        }
        const metricsByTrader = new Map();
        for (const metrics of payload.metrics) {
            metricsByTrader.set(metrics.traderExternalId, metrics);
        }
        for (const trader of payload.traders) {
            const accounts = accountsByTrader.get(trader.externalId) ?? [];
            const trades = accounts.flatMap((account) => tradesByAccount.get(account.externalId) ?? []);
            const metrics = metricsByTrader.get(trader.externalId);
            const bundle = {
                trader,
                accounts,
                trades,
                metrics,
            };
            try {
                const counts = await this.repository.persistTraderBundle(bundle);
                summary.tradersInserted += counts.tradersInserted;
                summary.tradersUpdated += counts.tradersUpdated;
                summary.accountsInserted += counts.accountsInserted;
                summary.accountsUpdated += counts.accountsUpdated;
                summary.tradesInserted += counts.tradesInserted;
                summary.tradesUpdated += counts.tradesUpdated;
                summary.metricsInserted += counts.metricsInserted;
                summary.metricsUpdated += counts.metricsUpdated;
            }
            catch (error) {
                summary.skippedRecords += accounts.length + trades.length + (metrics ? 1 : 0) + 1;
                logger_1.PersistenceLogger.error("PERSISTENCE_SERVICE", "Failed to persist trader bundle", error, { traderExternalId: trader.externalId });
            }
        }
        return summary;
    }
    async persistFromRawUsers(rawUsers) {
        logger_1.PersistenceLogger.info("PERSISTENCE_SERVICE", "Normalizing MT5 user payload", {
            total: rawUsers.length,
        });
        const { payload, skipped } = this.normalizeMt5Users(rawUsers);
        const summary = await this.persistNormalizedPayload(payload);
        summary.skippedRecords += skipped;
        logger_1.PersistenceLogger.info("PERSISTENCE_SERVICE", "MT5 persistence complete", {
            tradersInserted: summary.tradersInserted,
            tradersUpdated: summary.tradersUpdated,
            accountsInserted: summary.accountsInserted,
            accountsUpdated: summary.accountsUpdated,
            tradesInserted: summary.tradesInserted,
            tradesUpdated: summary.tradesUpdated,
            metricsInserted: summary.metricsInserted,
            metricsUpdated: summary.metricsUpdated,
            skippedRecords: summary.skippedRecords,
        });
        return summary;
    }
}
exports.PersistenceService = PersistenceService;
//# sourceMappingURL=persistence.service.js.map
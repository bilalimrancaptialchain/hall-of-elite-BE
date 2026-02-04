"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraderProfileFromLatestSnapshot = void 0;
const client_1 = require("../../../prisma/client");
/**
 * Read model for /elite/[id] – returns the latest snapshot view
 * for a specific trader, if available.
 */
const getTraderProfileFromLatestSnapshot = async (traderId) => {
    const latestRun = await client_1.prisma.snapshotRun.findFirst({
        orderBy: { createdAt: "desc" },
    });
    if (!latestRun) {
        return null;
    }
    const row = await client_1.prisma.traderSnapshot.findFirst({
        where: {
            snapshotId: latestRun.id,
            traderId,
        },
    });
    if (!row) {
        return null;
    }
    const trader = await client_1.prisma.mt5Trader.findUnique({
        where: { id: traderId },
    });
    return {
        traderId: row.traderId,
        externalTraderId: row.externalTraderId,
        displayName: trader?.name ?? row.externalTraderId,
        score: row.score,
        rank: row.rank,
        tier: row.tier,
        badges: row.badges,
        metrics: row.metrics,
    };
};
exports.getTraderProfileFromLatestSnapshot = getTraderProfileFromLatestSnapshot;
//# sourceMappingURL=traderProfile.read.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEliteLeaderboardFromLatestSnapshot = void 0;
const client_1 = require("../../../prisma/client");
/**
 * Fetch elite leaderboard data from the latest snapshot run.
 * Read-only, snapshot-based view for the /elite page.
 */
const getEliteLeaderboardFromLatestSnapshot = async (limit = 100) => {
    const latestRun = await client_1.prisma.snapshotRun.findFirst({
        orderBy: { createdAt: "desc" },
    });
    if (!latestRun) {
        return [];
    }
    const rows = await client_1.prisma.traderSnapshot.findMany({
        where: { snapshotId: latestRun.id },
        orderBy: { rank: "asc" },
        take: limit,
    });
    if (rows.length === 0) {
        return [];
    }
    const traderIds = rows.map((row) => row.traderId);
    const traders = await client_1.prisma.mt5Trader.findMany({
        where: {
            id: { in: traderIds },
        },
    });
    const nameById = new Map(traders.map((t) => [t.id, t.name]));
    return rows.map((row) => ({
        traderId: row.traderId,
        externalTraderId: row.externalTraderId,
        displayName: nameById.get(row.traderId) ?? row.externalTraderId,
        score: row.score,
        rank: row.rank,
        tier: row.tier,
        badges: row.badges,
        metrics: row.metrics,
    }));
};
exports.getEliteLeaderboardFromLatestSnapshot = getEliteLeaderboardFromLatestSnapshot;
//# sourceMappingURL=elite.read.js.map
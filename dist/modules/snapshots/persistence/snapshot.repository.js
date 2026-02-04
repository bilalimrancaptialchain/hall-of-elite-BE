"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotRepository = void 0;
const client_1 = require("../../../prisma/client");
class SnapshotRepository {
    async createSnapshotRun(metadata, traders) {
        const created = await client_1.prisma.$transaction(async (tx) => {
            const run = await tx.snapshotRun.create({
                data: {
                    runKey: metadata.runKey,
                    version: metadata.version,
                    label: metadata.label,
                    generatedAt: metadata.generatedAt,
                },
            });
            if (traders.length > 0) {
                await tx.traderSnapshot.createMany({
                    data: traders.map((trader) => ({
                        snapshotId: run.id,
                        traderId: trader.traderId,
                        externalTraderId: trader.externalTraderId,
                        score: trader.score,
                        rank: trader.rank,
                        tier: trader.tier,
                        badges: trader.badges,
                        metrics: trader.metrics,
                    })),
                });
            }
            const traderSnapshots = await tx.traderSnapshot.findMany({
                where: { snapshotId: run.id },
                orderBy: { rank: "asc" },
            });
            return { run, traderSnapshots };
        });
        return {
            id: created.run.id,
            metadata,
            createdAt: created.run.createdAt,
            traders: created.traderSnapshots.map((row) => ({
                id: row.id,
                snapshotId: row.snapshotId,
                traderId: row.traderId,
                externalTraderId: row.externalTraderId,
                score: row.score,
                rank: row.rank,
                tier: row.tier,
                badges: row.badges,
                metrics: row.metrics,
                createdAt: row.createdAt,
            })),
        };
    }
    async findSnapshotByRunKey(runKey) {
        const run = await client_1.prisma.snapshotRun.findUnique({
            where: { runKey },
        });
        if (!run) {
            return null;
        }
        const traderSnapshots = await client_1.prisma.traderSnapshot.findMany({
            where: { snapshotId: run.id },
            orderBy: { rank: "asc" },
        });
        return {
            id: run.id,
            metadata: {
                runKey: run.runKey,
                version: run.version,
                label: run.label ?? undefined,
                generatedAt: run.generatedAt ?? undefined,
            },
            createdAt: run.createdAt,
            traders: traderSnapshots.map((row) => ({
                id: row.id,
                snapshotId: row.snapshotId,
                traderId: row.traderId,
                externalTraderId: row.externalTraderId,
                score: row.score,
                rank: row.rank,
                tier: row.tier,
                badges: row.badges,
                metrics: row.metrics,
                createdAt: row.createdAt,
            })),
        };
    }
    async findLatestSnapshot() {
        const run = await client_1.prisma.snapshotRun.findFirst({
            orderBy: { createdAt: "desc" },
        });
        if (!run) {
            return null;
        }
        return this.findSnapshotByRunKey(run.runKey);
    }
}
exports.SnapshotRepository = SnapshotRepository;
//# sourceMappingURL=snapshot.repository.js.map
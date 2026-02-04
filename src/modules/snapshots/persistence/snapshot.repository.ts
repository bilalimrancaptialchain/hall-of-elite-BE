import { prisma } from "../../../prisma/client";
import { SnapshotMetadata, TraderSnapshotInput, TraderSnapshot, EliteSnapshot } from "../types/snapshot.types";

export class SnapshotRepository {
  async createSnapshotRun(
    metadata: SnapshotMetadata,
    traders: TraderSnapshotInput[]
  ): Promise<EliteSnapshot> {
    const created = await prisma.$transaction(async (tx) => {
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
            badges: trader.badges as unknown as any,
            metrics: trader.metrics as unknown as any,
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
        tier: row.tier as TraderSnapshot["tier"],
        badges: row.badges as unknown as TraderSnapshot["badges"],
        metrics: row.metrics as unknown as TraderSnapshot["metrics"],
        createdAt: row.createdAt,
      })),
    };
  }

  async findSnapshotByRunKey(runKey: string): Promise<EliteSnapshot | null> {
    const run = await prisma.snapshotRun.findUnique({
      where: { runKey },
    });

    if (!run) {
      return null;
    }

    const traderSnapshots = await prisma.traderSnapshot.findMany({
      where: { snapshotId: run.id },
      orderBy: { rank: "asc" },
    });

    return {
      id: run.id,
      metadata: {
        runKey: run.runKey,
        version: run.version as SnapshotMetadata["version"],
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
        tier: row.tier as TraderSnapshot["tier"],
        badges: row.badges as unknown as TraderSnapshot["badges"],
        metrics: row.metrics as unknown as TraderSnapshot["metrics"],
        createdAt: row.createdAt,
      })),
    };
  }

  async findLatestSnapshot(): Promise<EliteSnapshot | null> {
    const run = await prisma.snapshotRun.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!run) {
      return null;
    }

    return this.findSnapshotByRunKey(run.runKey);
  }
}

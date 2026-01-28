import { prisma } from "../../../prisma/client";
import { TraderTier } from "../../../types";
import {
  TraderSnapshotBadges,
  TraderSnapshotMetricsSummary,
} from "../types/snapshot.types";

export interface TraderProfileSnapshot {
  readonly traderId: string;
  readonly externalTraderId: string;
  readonly displayName: string;
  readonly score: number;
  readonly rank: number;
  readonly tier: TraderTier;
  readonly badges: TraderSnapshotBadges;
  readonly metrics: TraderSnapshotMetricsSummary;
}

/**
 * Read model for /elite/[id] – returns the latest snapshot view
 * for a specific trader, if available.
 */
export const getTraderProfileFromLatestSnapshot = async (
  traderId: string
): Promise<TraderProfileSnapshot | null> => {
  const latestRun = await prisma.snapshotRun.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!latestRun) {
    return null;
  }

  const row = await prisma.traderSnapshot.findFirst({
    where: {
      snapshotId: latestRun.id,
      traderId,
    },
  });

  if (!row) {
    return null;
  }

  const trader = await prisma.mt5Trader.findUnique({
    where: { id: traderId },
  });

  return {
    traderId: row.traderId,
    externalTraderId: row.externalTraderId,
    displayName: trader?.name ?? row.externalTraderId,
    score: row.score,
    rank: row.rank,
    tier: row.tier as TraderTier,
    badges: row.badges as TraderSnapshotBadges,
    metrics: row.metrics as TraderSnapshotMetricsSummary,
  };
};

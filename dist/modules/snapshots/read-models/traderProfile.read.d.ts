import { TraderTier } from "../../../types";
import { TraderSnapshotBadges, TraderSnapshotMetricsSummary } from "../types/snapshot.types";
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
export declare const getTraderProfileFromLatestSnapshot: (traderId: string) => Promise<TraderProfileSnapshot | null>;
//# sourceMappingURL=traderProfile.read.d.ts.map
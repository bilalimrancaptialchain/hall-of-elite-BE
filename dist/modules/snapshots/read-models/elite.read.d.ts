import { TraderTier } from "../../../types";
import { TraderSnapshotBadges, TraderSnapshotMetricsSummary } from "../types/snapshot.types";
export interface EliteListItem {
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
 * Fetch elite leaderboard data from the latest snapshot run.
 * Read-only, snapshot-based view for the /elite page.
 */
export declare const getEliteLeaderboardFromLatestSnapshot: (limit?: number) => Promise<EliteListItem[]>;
//# sourceMappingURL=elite.read.d.ts.map
import { TraderTier } from "../../../types";
export declare enum SnapshotVersion {
    V1 = "V1"
}
export interface SnapshotMetadata {
    /** Stable, idempotent key for this run (e.g. date range hash). */
    readonly runKey: string;
    /** Logical version of the snapshot schema. */
    readonly version: SnapshotVersion;
    /** Optional human label, e.g. "Daily run 2026-01-28". */
    readonly label?: string;
    /** Optional time the scoring run completed. */
    readonly generatedAt?: Date;
}
export interface TraderSnapshotMetricsSummary {
    readonly profitFactor: number;
    readonly winRatePct: number;
    readonly drawdownPct: number;
    readonly tradingDays: number;
    readonly totalTrades: number;
}
export interface TraderSnapshotBadges {
    readonly phoenixAddOn: boolean;
    readonly payoutBoost: boolean;
    readonly cashback: boolean;
    readonly merchandise: boolean;
}
export interface TraderSnapshotInput {
    readonly traderId: string;
    readonly externalTraderId: string;
    readonly score: number;
    readonly rank: number;
    readonly tier: TraderTier;
    readonly metrics: TraderSnapshotMetricsSummary;
    readonly badges: TraderSnapshotBadges;
}
export interface TraderSnapshot extends TraderSnapshotInput {
    readonly id: string;
    readonly snapshotId: string;
    readonly createdAt: Date;
}
export interface EliteSnapshot {
    readonly id: string;
    readonly metadata: SnapshotMetadata;
    readonly createdAt: Date;
    readonly traders: TraderSnapshot[];
}
//# sourceMappingURL=snapshot.types.d.ts.map
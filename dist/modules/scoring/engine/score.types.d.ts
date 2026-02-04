/**
 * Canonical keys for scoring factors used by the engine.
 */
export type ScoreFactorKey = "profitFactor" | "winRate" | "drawdown" | "activity";
/**
 * Normalized metrics consumed by the scoring engine.
 * All fields must already be validated and finite (no NaN/Infinity).
 */
export interface ScoringMetrics {
    readonly profitFactor: number;
    readonly winRatePct: number;
    readonly drawdownPct: number;
    readonly tradingDays: number;
    readonly totalTrades: number;
}
/**
 * Result of a single factor scorer.
 */
export interface ScoreFactorResult {
    readonly key: ScoreFactorKey;
    readonly label: string;
    /** Unweighted factor score in the range [0, 100]. */
    readonly score: number;
    /** Optional extra details for debugging and analytics. */
    readonly details?: Record<string, unknown>;
}
/**
 * Breakdown of all factor scores keyed by factor.
 */
export type ScoreBreakdown = Record<ScoreFactorKey, ScoreFactorResult>;
/**
 * Final scoring output for a trader.
 */
export interface ScoreResult {
    /** Weighted total score in the range [0, 100]. */
    readonly totalScore: number;
    readonly breakdown: ScoreBreakdown;
}
//# sourceMappingURL=score.types.d.ts.map
/**
 * Tier levels used for ranking output.
 * Kept independent from persistence enums for flexibility.
 */
export enum TierLevel {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
  ELITE = "ELITE",
}

/**
 * Minimal scored trader shape consumed by the ranking engine.
 */
export interface ScoredTraderInput {
  readonly traderId: string;
  readonly score: number;
  /** Optional tie-breaker: higher profit factor wins when scores are equal. */
  readonly profitFactor?: number;
  /** Optional tie-breaker: lower drawdown wins when scores and profit factor match. */
  readonly drawdownPct?: number;
}

/**
 * Ranked trader with position in the leaderboard.
 */
export interface RankedTrader extends ScoredTraderInput {
  /** 1-based rank; smaller is better. */
  readonly rank: number;
}

/**
 * Tier assignment result for a trader.
 */
export interface TierAssignmentResult extends RankedTrader {
  readonly tier: TierLevel;
  /** Human-readable explanation of why this tier was chosen. */
  readonly tierReason: string;
}

/**
 * Optional context metadata for ranking runs.
 */
export interface RankingContext {
  readonly runId?: string;
  readonly generatedAt?: Date;
}

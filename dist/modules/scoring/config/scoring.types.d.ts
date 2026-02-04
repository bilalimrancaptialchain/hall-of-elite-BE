import { TraderTier } from "../../../types";
/**
 * Keys for individual eligibility rules.
 * Useful for logging and UI explanations.
 */
export declare enum EligibilityRuleKey {
    MIN_TRADING_DAYS = "MIN_TRADING_DAYS",
    MIN_TOTAL_TRADES = "MIN_TOTAL_TRADES",
    MIN_PROFIT_FACTOR = "MIN_PROFIT_FACTOR",
    MAX_DRAWDOWN_PCT = "MAX_DRAWDOWN_PCT",
    MIN_WIN_RATE_PCT = "MIN_WIN_RATE_PCT"
}
/**
 * Declarative configuration for hard eligibility rules.
 * All numeric values are human-scale (days, trades, percentages, raw ratios).
 */
export interface EligibilityRulesConfig {
    readonly minTradingDays: number;
    readonly minTotalTrades: number;
    readonly minProfitFactor: number;
    /** Maximum allowed peak-to-valley drawdown, in percentage points (0–100). */
    readonly maxDrawdownPct: number;
    /** Minimum required win rate, in percentage points (0–100). */
    readonly minWinRatePct: number;
}
/**
 * Supported metric keys for scoring weights.
 */
export type ScoringMetricKey = "profitFactor" | "drawdownPct" | "winRatePct" | "tradingDays";
/**
 * Declarative configuration for scoring weights.
 * Values are expressed in percentage points and MUST sum to 100.
 */
export type ScoringWeightsConfig = Readonly<Record<ScoringMetricKey, number>>;
/**
 * Tier identifier – aligned with the global TraderTier enum.
 */
export type TierId = TraderTier;
/**
 * Declarative tier definition.
 * minScore/maxScore are on a 0–100 scale.
 */
export interface TierDefinition {
    readonly id: TierId;
    readonly label: string;
    readonly minScore: number;
    readonly maxScore: number | null;
    /** Determines ordering from lowest to highest tier. */
    readonly order: number;
}
//# sourceMappingURL=scoring.types.d.ts.map
import { EligibilityRulesConfig } from "./scoring.types";

/**
 * Hard consistency rules for trader eligibility.
 * All values are declarative thresholds; no calculations or logic.
 */
export const ELIGIBILITY_RULES: Readonly<EligibilityRulesConfig> = {
  /**
   * Minimum distinct trading days required for a trader to be considered.
   */
  minTradingDays: 30,

  /**
   * Minimum number of closed trades required for evaluation.
   */
  minTotalTrades: 20,

  /**
   * Minimum acceptable profit factor (gross profit / gross loss).
   */
  minProfitFactor: 1.2,

  /**
   * Maximum allowed peak-to-valley drawdown, in percentage points (0–100).
   */
  maxDrawdownPct: 25,

  /**
   * Minimum required win rate, in percentage points (0–100).
   */
  minWinRatePct: 50,
} as const;

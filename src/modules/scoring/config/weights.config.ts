import { ScoringWeightsConfig } from "./scoring.types";

/**
 * Relative importance of each metric in the final consistency score.
 * Values are expressed in percentage points and MUST always sum to 100.
 */
export const SCORING_WEIGHTS: ScoringWeightsConfig = {
  /**
   * Profit factor – how efficiently the trader converts risk into return.
   */
  profitFactor: 35,

  /**
   * Drawdown (inverse weight) – penalises large equity declines.
   */
  drawdownPct: 25,

  /**
   * Win rate – percentage of winning trades.
   */
  winRatePct: 25,

  /**
   * Trading days – rewards long-term, consistent activity.
   */
  tradingDays: 15,
} as const;

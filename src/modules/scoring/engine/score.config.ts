import { SCORING_WEIGHTS as BASE_WEIGHTS } from "../config/weights.config";

/**
 * Configuration for metric normalization ranges and score caps.
 * All numbers are declarative; no logic is performed here.
 */
export const SCORE_CONFIG = {
  /** Per-factor weights, expressed as percentages and expected to sum to 100. */
  weights: {
    profitFactor: BASE_WEIGHTS.profitFactor,
    drawdown: BASE_WEIGHTS.drawdownPct,
    winRate: BASE_WEIGHTS.winRatePct,
    activity: BASE_WEIGHTS.tradingDays,
  },
  /** Normalization ranges for converting raw metrics to 0–100 factor scores. */
  ranges: {
    profitFactor: {
      /** Profit factor below this is treated as 0. */
      min: 1.0,
      /** Profit factor at or above this is treated as 100 (soft cap). */
      max: 3.0,
    },
    winRatePct: {
      /** Win rate at or below this is 0. */
      min: 40,
      /** Win rate at or above this is 100. */
      max: 80,
    },
    drawdownPct: {
      /** Best-case drawdown (0% = no drawdown). */
      min: 0,
      /** Worst-case drawdown for scaling penalties. */
      max: 60,
    },
    tradingDays: {
      /** Minimum days of activity needed to start scoring. */
      min: 30,
      /** Days of activity at or above this saturate the activity component. */
      max: 365,
    },
    totalTrades: {
      /** Minimum trades for stable activity scoring. */
      min: 20,
      /** Trades at or above this saturate the activity component. */
      max: 2000,
    },
  },
  /** Global scoring caps. */
  caps: {
    /** Overall score is always clamped to this range. */
    minTotalScore: 0,
    maxTotalScore: 100,
  },
} as const;

export type ScoreConfig = typeof SCORE_CONFIG;

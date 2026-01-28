import { SCORE_CONFIG } from "../score.config";
import { clamp, normalizeInverseRange, roundTo } from "../score.utils";
import { ScoreFactorResult, ScoringMetrics } from "../score.types";

/**
 * Drawdown scoring.
 *
 * - Lower drawdown is better.
 * - Uses an inverse, non-linear penalty to hit high drawdown harder.
 */
export const scoreDrawdown = (metrics: ScoringMetrics): ScoreFactorResult => {
  const { min, max } = SCORE_CONFIG.ranges.drawdownPct;
  const raw = metrics.drawdownPct;

  const linearComponent = normalizeInverseRange(raw, min, max);

  // Exponential penalty to make high drawdowns hurt more.
  const ratio = clamp(raw / max, 0, 1);
  const penalty = Math.pow(ratio, 2); // quadratic penalty
  const penalizedScore = linearComponent * (1 - 0.5 * penalty); // cap penalty at 50%

  const score = clamp(roundTo(penalizedScore, 2), 0, 100);

  return {
    key: "drawdown",
    label: "Drawdown",
    score,
    details: {
      drawdownPct: raw,
      normalizedRange: { min, max },
    },
  };
};

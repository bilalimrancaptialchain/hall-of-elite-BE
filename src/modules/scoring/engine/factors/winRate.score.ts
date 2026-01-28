import { SCORE_CONFIG } from "../score.config";
import { normalizeRange, roundTo, clamp } from "../score.utils";
import { ScoreFactorResult, ScoringMetrics } from "../score.types";

/**
 * Win rate scoring.
 *
 * - Win rate <= min -> 0
 * - Win rate >= max -> 100
 * - Smooth linear scaling in between.
 * - Extremely high win rates are handled at the eligibility layer, not here.
 */
export const scoreWinRate = (metrics: ScoringMetrics): ScoreFactorResult => {
  const { min, max } = SCORE_CONFIG.ranges.winRatePct;

  const raw = metrics.winRatePct;
  const baseScore = normalizeRange(raw, min, max);
  const score = clamp(roundTo(baseScore, 2), 0, 100);

  return {
    key: "winRate",
    label: "Win Rate",
    score,
    details: {
      winRatePct: raw,
      normalizedRange: { min, max },
    },
  };
};

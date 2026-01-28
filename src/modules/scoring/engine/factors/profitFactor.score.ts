import { SCORE_CONFIG } from "../score.config";
import { normalizeRange, roundTo, clamp } from "../score.utils";
import { ScoreFactorResult, ScoringMetrics } from "../score.types";

/**
 * Profit factor scoring.
 *
 * - PF < min -> 0
 * - PF between [min, max] -> 0–100
 * - PF > max -> asymptotically capped near 100 to prevent whales from dominating.
 */
export const scoreProfitFactor = (metrics: ScoringMetrics): ScoreFactorResult => {
  const { min, max } = SCORE_CONFIG.ranges.profitFactor;

  const raw = metrics.profitFactor;
  let baseScore = normalizeRange(raw, min, max);

  if (raw > max) {
    // Apply a soft saturation curve for very high profit factors.
    const excess = raw - max;
    const dampening = 1 / (1 + excess); // quickly approaches 0 as excess grows
    baseScore = 100 - 20 * (1 - dampening); // never drops more than 20 pts from 100
  }

  const score = clamp(roundTo(baseScore, 2), 0, 100);

  return {
    key: "profitFactor",
    label: "Profit Factor",
    score,
    details: {
      profitFactor: raw,
      normalizedRange: { min, max },
    },
  };
};

import { TIER_CONFIG } from "./tier.config";
import { TierAssignmentResult, TierLevel } from "./tier.types";
import { clampScore, isScoreInBand } from "./tier.utils";

/**
 * Resolve a tier from a numerical score using the configured bands.
 * Pure, deterministic, and independent of scoring, ranking, or persistence.
 */
export const assignTierFromScore = (rawScore: number): TierAssignmentResult => {
  const score = clampScore(rawScore);

  const band =
    TIER_CONFIG.find((entry) => isScoreInBand(score, entry.minScore, entry.maxScore)) ??
    TIER_CONFIG[0];

  const tier: TierLevel = band.level;

  const tierReason = `Score ${score.toFixed(
    2
  )} falls within ${band.label} tier [${band.minScore}, ${band.maxScore}]`;

  return {
    score,
    tier,
    tierLabel: band.label,
    tierReason,
  };
};

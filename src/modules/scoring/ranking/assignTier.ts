import { TIER_CONFIG } from "./tier.config";
import { RankedTrader, TierAssignmentResult, TierLevel } from "./ranking.types";

/**
 * Assign a tier based on a trader's score using static thresholds.
 */
export const assignTier = (trader: RankedTrader): TierAssignmentResult => {
  const level =
    TIER_CONFIG.levels.find(
      (tier) =>
        trader.score >= tier.minScore &&
        (tier.maxScore === null || trader.score <= tier.maxScore)
    ) ?? TIER_CONFIG.levels[0];

  const tier: TierLevel = level.id;

  const tierReason = `Score ${trader.score.toFixed(
    2
  )} falls within ${level.label} band [${level.minScore}, ${level.maxScore ?? "∞"})`;

  return {
    ...trader,
    tier,
    tierReason,
  };
};

/**
 * Bulk tier assignment for an already-ranked list of traders.
 * Input is not mutated.
 */
export const assignTiers = (traders: readonly RankedTrader[]): TierAssignmentResult[] =>
  traders.map(assignTier);

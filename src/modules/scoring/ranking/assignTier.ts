import { TIER_CONFIG } from "../tiers/tier.config";
import { RankedTrader, TierAssignmentResult, TierLevel } from "./ranking.types";

/**
 * Assign a tier based on a trader's score using static thresholds.
 */
export const assignTier = (trader: RankedTrader): TierAssignmentResult => {
  const level =
    TIER_CONFIG.find(
      (tier: any) =>
        trader.score >= tier.minScore &&
        (tier.maxScore === null || trader.score <= tier.maxScore)
    ) ?? TIER_CONFIG[0];

  const tier: TierLevel = level.level;

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

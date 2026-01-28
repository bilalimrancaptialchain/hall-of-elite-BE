import { TraderTier } from "../../../types";
import { TierDefinition } from "./scoring.types";

/**
 * Declarative mapping from score ranges (0–100) to tiers.
 * Ordered from lowest to highest tier.
 */
export const TIER_DEFINITIONS: readonly TierDefinition[] = [
  {
    id: TraderTier.BRONZE,
    label: "Bronze",
    minScore: 0,
    maxScore: 24.99,
    order: 1,
  },
  {
    id: TraderTier.SILVER,
    label: "Silver",
    minScore: 25,
    maxScore: 39.99,
    order: 2,
  },
  {
    id: TraderTier.GOLD,
    label: "Gold",
    minScore: 40,
    maxScore: 54.99,
    order: 3,
  },
  {
    id: TraderTier.PLATINUM,
    label: "Platinum",
    minScore: 55,
    maxScore: 69.99,
    order: 4,
  },
  {
    id: TraderTier.DIAMOND,
    label: "Diamond",
    minScore: 70,
    maxScore: 84.99,
    order: 5,
  },
  {
    id: TraderTier.ELITE,
    label: "Elite",
    minScore: 85,
    maxScore: 100,
    order: 6,
  },
] as const;

import { TIER_DEFINITIONS } from "../config/tiers.config";
import { TierConfigEntry, TierLevel } from "./tier.types";

/**
 * Centralized tier configuration for the Tier Resolver.
 * Adapted from the core scoring tier definitions to avoid duplication.
 */
export const TIER_CONFIG: readonly TierConfigEntry[] = TIER_DEFINITIONS.map(
  (def): TierConfigEntry => ({
    level: def.id as unknown as TierLevel,
    label: def.label,
    minScore: def.minScore,
    maxScore: def.maxScore ?? 100,
    order: def.order,
  })
).sort((a, b) => a.order - b.order);

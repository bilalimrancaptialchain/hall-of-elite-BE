/**
 * Tier levels used by the Tier Resolver.
 * Kept local for flexibility but aligned with core tier naming.
 */
export enum TierLevel {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  DIAMOND = "DIAMOND",
  ELITE = "ELITE",
}

/**
 * Declarative configuration for a single tier band.
 * All scores are on a 0–100 scale.
 */
export interface TierConfigEntry {
  readonly level: TierLevel;
  readonly label: string;
  readonly minScore: number;
  readonly maxScore: number;
  /** Determines ordering from lowest to highest tier. */
  readonly order: number;
}

/**
 * Result of resolving a tier from a numerical score.
 */
export interface TierAssignmentResult {
  readonly score: number;
  readonly tier: TierLevel;
  readonly tierLabel: string;
  readonly tierReason: string;
}

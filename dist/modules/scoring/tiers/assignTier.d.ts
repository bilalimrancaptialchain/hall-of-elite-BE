import { TierAssignmentResult } from "./tier.types";
/**
 * Resolve a tier from a numerical score using the configured bands.
 * Pure, deterministic, and independent of scoring, ranking, or persistence.
 */
export declare const assignTierFromScore: (rawScore: number) => TierAssignmentResult;
//# sourceMappingURL=assignTier.d.ts.map
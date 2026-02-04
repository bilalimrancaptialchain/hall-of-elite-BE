import { RankedTrader, TierAssignmentResult } from "./ranking.types";
/**
 * Assign a tier based on a trader's score using static thresholds.
 */
export declare const assignTier: (trader: RankedTrader) => TierAssignmentResult;
/**
 * Bulk tier assignment for an already-ranked list of traders.
 * Input is not mutated.
 */
export declare const assignTiers: (traders: readonly RankedTrader[]) => TierAssignmentResult[];
//# sourceMappingURL=assignTier.d.ts.map
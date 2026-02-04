/**
 * Single source of truth for tier → reward eligibility (flags only).
 * Used by RewardsService and AdminService (static fallback).
 * MVP: config file; no fulfillment ops.
 */
import { TraderTier } from "../../types";
export interface TierRewardFlags {
    phoenixAddOn: boolean;
    payoutBoost: boolean;
    cashback: boolean;
    merchandise: boolean;
}
export declare const TIER_REWARDS_MAP: Record<TraderTier, TierRewardFlags>;
//# sourceMappingURL=tier-rewards.config.d.ts.map
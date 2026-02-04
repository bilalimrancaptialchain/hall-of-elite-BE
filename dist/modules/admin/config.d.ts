import { TraderTier } from "../../types";
import { TierConfigDTO, RewardConfigDTO } from "./admin.dto";
export declare const staticTierConfig: Record<TraderTier, Omit<TierConfigDTO, "tierId">>;
/** Derived from shared TIER_REWARDS_MAP (single source of truth). */
export declare const staticRewardConfig: Record<TraderTier, Omit<RewardConfigDTO, "tierId" | "tierName">>;
//# sourceMappingURL=config.d.ts.map
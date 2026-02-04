"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsService = void 0;
const types_1 = require("../../types");
const client_1 = require("../../prisma/client");
const tier_rewards_config_1 = require("./tier-rewards.config");
class RewardsService {
    async getRewardEligibility(traderId) {
        try {
            // Resolve tier: prefer Mt5TraderScore (by traderId), fallback to TraderScore (by tradingAccountId)
            let tier = null;
            const mt5Score = await client_1.prisma.mt5TraderScore.findUnique({
                where: { traderId },
            });
            if (mt5Score?.tier) {
                tier = mt5Score.tier;
            }
            if (tier == null) {
                const traderScore = await client_1.prisma.traderScore.findUnique({
                    where: { tradingAccountId: traderId },
                });
                if (traderScore?.tier) {
                    tier = traderScore.tier;
                }
            }
            if (tier == null) {
                return null;
            }
            const baseRewards = tier_rewards_config_1.TIER_REWARDS_MAP[tier] ?? tier_rewards_config_1.TIER_REWARDS_MAP[types_1.TraderTier.BRONZE];
            const rewardEntitlements = await client_1.prisma.rewardEntitlement.findMany({
                where: {
                    traderId,
                    status: "PENDING",
                },
            });
            const rewards = {
                phoenixAddOn: baseRewards.phoenixAddOn || rewardEntitlements.some((r) => r.rewardType === "BONUS"),
                payoutBoost: baseRewards.payoutBoost || rewardEntitlements.some((r) => r.rewardType === "BONUS"),
                cashback: baseRewards.cashback || rewardEntitlements.some((r) => r.rewardType === "CASH"),
                merchandise: baseRewards.merchandise || rewardEntitlements.some((r) => r.rewardType === "MERCHANDISE"),
            };
            return {
                traderId,
                rewards,
            };
        }
        catch (error) {
            console.error("Error fetching reward eligibility:", error);
            return null;
        }
    }
    async getRewardEligibilityMock(traderId) {
        return {
            traderId,
            rewards: {
                phoenixAddOn: true,
                payoutBoost: true,
                cashback: true,
                merchandise: false,
            },
        };
    }
}
exports.RewardsService = RewardsService;
//# sourceMappingURL=rewards.service.js.map
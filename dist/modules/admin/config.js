"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticRewardConfig = exports.staticTierConfig = void 0;
const types_1 = require("../../types");
const tier_rewards_config_1 = require("../rewards/tier-rewards.config");
exports.staticTierConfig = {
    [types_1.TraderTier.BRONZE]: {
        name: "Bronze",
        minScore: 0,
        maxScore: 20,
        badge: "Bronze",
        color: "#cd7f32",
        description: "Entry level tier",
    },
    [types_1.TraderTier.SILVER]: {
        name: "Silver",
        minScore: 20,
        maxScore: 40,
        badge: "Silver",
        color: "#c0c0c0",
        description: "Intermediate tier",
    },
    [types_1.TraderTier.GOLD]: {
        name: "Gold",
        minScore: 40,
        maxScore: 60,
        badge: "Gold",
        color: "#ffd700",
        description: "Advanced tier",
    },
    [types_1.TraderTier.PLATINUM]: {
        name: "Platinum",
        minScore: 60,
        maxScore: 80,
        badge: "Platinum",
        color: "#e5e4e2",
        description: "Expert tier",
    },
    [types_1.TraderTier.DIAMOND]: {
        name: "Diamond",
        minScore: 80,
        maxScore: 95,
        badge: "Diamond",
        color: "#b9f2ff",
        description: "Master tier",
    },
    [types_1.TraderTier.ELITE]: {
        name: "Elite",
        minScore: 95,
        badge: "Elite",
        color: "#8b00ff",
        description: "Elite tier - highest achievement",
    },
};
/** Derived from shared TIER_REWARDS_MAP (single source of truth). */
exports.staticRewardConfig = Object.fromEntries(Object.entries(tier_rewards_config_1.TIER_REWARDS_MAP).map(([tier, flags]) => [
    tier,
    {
        phoenixAddOn: flags.phoenixAddOn,
        payoutBoost: flags.payoutBoost,
        cashback: flags.cashback,
        merchandise: flags.merchandise,
    },
]));
//# sourceMappingURL=config.js.map
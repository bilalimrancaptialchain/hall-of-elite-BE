"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("../../prisma/client");
const config_1 = require("./config");
class AdminService {
    async getTierConfigs() {
        try {
            const tiers = await client_1.prisma.tier.findMany({
                orderBy: { minScore: "asc" },
            });
            if (tiers.length > 0) {
                return tiers.map((tier) => ({
                    tierId: tier.id,
                    name: tier.name,
                    minScore: tier.minScore,
                    maxScore: tier.maxScore ?? undefined,
                    badge: tier.name,
                    color: tier.color ?? undefined,
                    icon: tier.icon ?? undefined,
                    description: tier.description ?? undefined,
                }));
            }
            return this.getStaticTierConfigs();
        }
        catch (error) {
            console.error("Error fetching tier configs from database:", error);
            return this.getStaticTierConfigs();
        }
    }
    async getRewardConfigs() {
        try {
            const rewards = await client_1.prisma.reward.findMany({
                include: {
                    entitlements: true,
                },
            });
            if (rewards.length > 0) {
                const tierRewardMap = new Map();
                rewards.forEach((reward) => {
                    const tierName = reward.tier;
                    const tierKey = tierName.toUpperCase();
                    if (!tierRewardMap.has(tierName)) {
                        tierRewardMap.set(tierName, {
                            tierId: tierName,
                            tierName: tierName,
                            phoenixAddOn: false,
                            payoutBoost: false,
                            cashback: false,
                            merchandise: false,
                        });
                    }
                    const config = tierRewardMap.get(tierName);
                    switch (reward.rewardType.toUpperCase()) {
                        case "BONUS":
                            if (reward.name.toLowerCase().includes("phoenix")) {
                                config.phoenixAddOn = reward.isActive;
                            }
                            else {
                                config.payoutBoost = reward.isActive;
                            }
                            break;
                        case "CASH":
                            config.cashback = reward.isActive;
                            break;
                        case "MERCHANDISE":
                            config.merchandise = reward.isActive;
                            break;
                    }
                });
                return Array.from(tierRewardMap.values());
            }
            return this.getStaticRewardConfigs();
        }
        catch (error) {
            console.error("Error fetching reward configs from database:", error);
            return this.getStaticRewardConfigs();
        }
    }
    async getTierConfigById(tierId) {
        try {
            const tier = await client_1.prisma.tier.findUnique({
                where: { id: tierId },
            });
            if (tier) {
                return {
                    tierId: tier.id,
                    name: tier.name,
                    minScore: tier.minScore,
                    maxScore: tier.maxScore ?? undefined,
                    badge: tier.name,
                    color: tier.color ?? undefined,
                    icon: tier.icon ?? undefined,
                    description: tier.description ?? undefined,
                };
            }
            return this.getStaticTierConfigById(tierId);
        }
        catch (error) {
            console.error("Error fetching tier config by ID:", error);
            return this.getStaticTierConfigById(tierId);
        }
    }
    getStaticTierConfigs() {
        return Object.entries(config_1.staticTierConfig).map(([tier, config]) => ({
            tierId: tier,
            ...config,
        }));
    }
    getStaticRewardConfigs() {
        return Object.entries(config_1.staticRewardConfig).map(([tier, config]) => ({
            tierId: tier,
            tierName: config_1.staticTierConfig[tier].name,
            ...config,
        }));
    }
    getStaticTierConfigById(tierId) {
        const tier = tierId.toUpperCase();
        const config = config_1.staticTierConfig[tier];
        if (!config) {
            return null;
        }
        return {
            tierId: tier,
            ...config,
        };
    }
}
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map
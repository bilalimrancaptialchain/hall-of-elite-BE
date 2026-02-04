"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIER_DEFINITIONS = void 0;
const types_1 = require("../../../types");
/**
 * Declarative mapping from score ranges (0–100) to tiers.
 * Ordered from lowest to highest tier.
 */
exports.TIER_DEFINITIONS = [
    {
        id: types_1.TraderTier.BRONZE,
        label: "Bronze",
        minScore: 0,
        maxScore: 24.99,
        order: 1,
    },
    {
        id: types_1.TraderTier.SILVER,
        label: "Silver",
        minScore: 25,
        maxScore: 39.99,
        order: 2,
    },
    {
        id: types_1.TraderTier.GOLD,
        label: "Gold",
        minScore: 40,
        maxScore: 54.99,
        order: 3,
    },
    {
        id: types_1.TraderTier.PLATINUM,
        label: "Platinum",
        minScore: 55,
        maxScore: 69.99,
        order: 4,
    },
    {
        id: types_1.TraderTier.DIAMOND,
        label: "Diamond",
        minScore: 70,
        maxScore: 84.99,
        order: 5,
    },
    {
        id: types_1.TraderTier.ELITE,
        label: "Elite",
        minScore: 85,
        maxScore: 100,
        order: 6,
    },
];
//# sourceMappingURL=tiers.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTiers = exports.assignTier = void 0;
const tier_config_1 = require("../tiers/tier.config");
/**
 * Assign a tier based on a trader's score using static thresholds.
 */
const assignTier = (trader) => {
    const level = tier_config_1.TIER_CONFIG.find((tier) => trader.score >= tier.minScore &&
        (tier.maxScore === null || trader.score <= tier.maxScore)) ?? tier_config_1.TIER_CONFIG[0];
    const tier = level.level;
    const tierReason = `Score ${trader.score.toFixed(2)} falls within ${level.label} band [${level.minScore}, ${level.maxScore ?? "∞"})`;
    return {
        ...trader,
        tier,
        tierReason,
    };
};
exports.assignTier = assignTier;
/**
 * Bulk tier assignment for an already-ranked list of traders.
 * Input is not mutated.
 */
const assignTiers = (traders) => traders.map(exports.assignTier);
exports.assignTiers = assignTiers;
//# sourceMappingURL=assignTier.js.map
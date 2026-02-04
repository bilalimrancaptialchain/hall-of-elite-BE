"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTierFromScore = void 0;
const tier_config_1 = require("./tier.config");
const tier_utils_1 = require("./tier.utils");
/**
 * Resolve a tier from a numerical score using the configured bands.
 * Pure, deterministic, and independent of scoring, ranking, or persistence.
 */
const assignTierFromScore = (rawScore) => {
    const score = (0, tier_utils_1.clampScore)(rawScore);
    const band = tier_config_1.TIER_CONFIG.find((entry) => (0, tier_utils_1.isScoreInBand)(score, entry.minScore, entry.maxScore)) ??
        tier_config_1.TIER_CONFIG[0];
    const tier = band.level;
    const tierReason = `Score ${score.toFixed(2)} falls within ${band.label} tier [${band.minScore}, ${band.maxScore}]`;
    return {
        score,
        tier,
        tierLabel: band.label,
        tierReason,
    };
};
exports.assignTierFromScore = assignTierFromScore;
//# sourceMappingURL=assignTier.js.map
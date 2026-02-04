"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScoreInBand = exports.clampScore = void 0;
/**
 * Clamp a numeric score into [0, 100].
 */
const clampScore = (score) => {
    if (!Number.isFinite(score)) {
        return 0;
    }
    if (score < 0)
        return 0;
    if (score > 100)
        return 100;
    return score;
};
exports.clampScore = clampScore;
/**
 * Check if a score falls within a [min, max] band (inclusive on both ends).
 */
const isScoreInBand = (score, minScore, maxScore) => score >= minScore && score <= maxScore;
exports.isScoreInBand = isScoreInBand;
//# sourceMappingURL=tier.utils.js.map
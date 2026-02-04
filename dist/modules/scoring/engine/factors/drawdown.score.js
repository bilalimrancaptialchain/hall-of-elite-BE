"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreDrawdown = void 0;
const score_config_1 = require("../score.config");
const score_utils_1 = require("../score.utils");
/**
 * Drawdown scoring.
 *
 * - Lower drawdown is better.
 * - Uses an inverse, non-linear penalty to hit high drawdown harder.
 */
const scoreDrawdown = (metrics) => {
    const { min, max } = score_config_1.SCORE_CONFIG.ranges.drawdownPct;
    const raw = metrics.drawdownPct;
    const linearComponent = (0, score_utils_1.normalizeInverseRange)(raw, min, max);
    // Exponential penalty to make high drawdowns hurt more.
    const ratio = (0, score_utils_1.clamp)(raw / max, 0, 1);
    const penalty = Math.pow(ratio, 2); // quadratic penalty
    const penalizedScore = linearComponent * (1 - 0.5 * penalty); // cap penalty at 50%
    const score = (0, score_utils_1.clamp)((0, score_utils_1.roundTo)(penalizedScore, 2), 0, 100);
    return {
        key: "drawdown",
        label: "Drawdown",
        score,
        details: {
            drawdownPct: raw,
            normalizedRange: { min, max },
        },
    };
};
exports.scoreDrawdown = scoreDrawdown;
//# sourceMappingURL=drawdown.score.js.map
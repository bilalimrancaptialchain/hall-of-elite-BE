"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreWinRate = void 0;
const score_config_1 = require("../score.config");
const score_utils_1 = require("../score.utils");
/**
 * Win rate scoring.
 *
 * - Win rate <= min -> 0
 * - Win rate >= max -> 100
 * - Smooth linear scaling in between.
 * - Extremely high win rates are handled at the eligibility layer, not here.
 */
const scoreWinRate = (metrics) => {
    const { min, max } = score_config_1.SCORE_CONFIG.ranges.winRatePct;
    const raw = metrics.winRatePct;
    const baseScore = (0, score_utils_1.normalizeRange)(raw, min, max);
    const score = (0, score_utils_1.clamp)((0, score_utils_1.roundTo)(baseScore, 2), 0, 100);
    return {
        key: "winRate",
        label: "Win Rate",
        score,
        details: {
            winRatePct: raw,
            normalizedRange: { min, max },
        },
    };
};
exports.scoreWinRate = scoreWinRate;
//# sourceMappingURL=winRate.score.js.map
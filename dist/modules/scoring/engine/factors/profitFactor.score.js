"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreProfitFactor = void 0;
const score_config_1 = require("../score.config");
const score_utils_1 = require("../score.utils");
/**
 * Profit factor scoring.
 *
 * - PF < min -> 0
 * - PF between [min, max] -> 0–100
 * - PF > max -> asymptotically capped near 100 to prevent whales from dominating.
 */
const scoreProfitFactor = (metrics) => {
    const { min, max } = score_config_1.SCORE_CONFIG.ranges.profitFactor;
    const raw = metrics.profitFactor;
    let baseScore = (0, score_utils_1.normalizeRange)(raw, min, max);
    if (raw > max) {
        // Apply a soft saturation curve for very high profit factors.
        const excess = raw - max;
        const dampening = 1 / (1 + excess); // quickly approaches 0 as excess grows
        baseScore = 100 - 20 * (1 - dampening); // never drops more than 20 pts from 100
    }
    const score = (0, score_utils_1.clamp)((0, score_utils_1.roundTo)(baseScore, 2), 0, 100);
    return {
        key: "profitFactor",
        label: "Profit Factor",
        score,
        details: {
            profitFactor: raw,
            normalizedRange: { min, max },
        },
    };
};
exports.scoreProfitFactor = scoreProfitFactor;
//# sourceMappingURL=profitFactor.score.js.map
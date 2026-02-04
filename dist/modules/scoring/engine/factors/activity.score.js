"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreActivity = void 0;
const score_config_1 = require("../score.config");
const score_utils_1 = require("../score.utils");
/**
 * Activity scoring.
 *
 * - Rewards sustained participation (trading days and total trades).
 * - Penalises extremely spiky activity by looking at trades-per-day.
 */
const scoreActivity = (metrics) => {
    const dayRange = score_config_1.SCORE_CONFIG.ranges.tradingDays;
    const tradeRange = score_config_1.SCORE_CONFIG.ranges.totalTrades;
    const daysScore = (0, score_utils_1.normalizeRange)(metrics.tradingDays, dayRange.min, dayRange.max);
    const tradesScore = (0, score_utils_1.normalizeRange)(metrics.totalTrades, tradeRange.min, tradeRange.max);
    // Trades per day gives a sense of stability vs extreme bursts.
    const tradesPerDay = (0, score_utils_1.safeDivide)(metrics.totalTrades, Math.max(metrics.tradingDays, 1));
    // Assume 1–20 trades per day is a reasonable band; outside gets softly penalised.
    const idealMin = 1;
    const idealMax = 20;
    const stabilityScore = (() => {
        if (tradesPerDay < idealMin) {
            // Under-trading: scale down based on how far below idealMin we are.
            const factor = (0, score_utils_1.clamp)(tradesPerDay / idealMin, 0, 1);
            return factor * 100;
        }
        if (tradesPerDay > idealMax) {
            // Over-trading: quadratic penalty beyond idealMax.
            const excessRatio = (0, score_utils_1.clamp)((tradesPerDay - idealMax) / idealMax, 0, 1);
            return (1 - Math.pow(excessRatio, 2)) * 100;
        }
        // Within ideal band.
        return 100;
    })();
    // Combine sub-components with equal weight.
    const rawScore = (daysScore + tradesScore + stabilityScore) / 3;
    const score = (0, score_utils_1.clamp)((0, score_utils_1.roundTo)(rawScore, 2), 0, 100);
    return {
        key: "activity",
        label: "Activity",
        score,
        details: {
            tradingDays: metrics.tradingDays,
            totalTrades: metrics.totalTrades,
            tradesPerDay,
            daysScore,
            tradesScore,
            stabilityScore,
        },
    };
};
exports.scoreActivity = scoreActivity;
//# sourceMappingURL=activity.score.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = void 0;
const score_config_1 = require("./score.config");
const score_utils_1 = require("./score.utils");
const profitFactor_score_1 = require("./factors/profitFactor.score");
const winRate_score_1 = require("./factors/winRate.score");
const drawdown_score_1 = require("./factors/drawdown.score");
const activity_score_1 = require("./factors/activity.score");
const FACTOR_ORDER = [
    "profitFactor",
    "winRate",
    "drawdown",
    "activity",
];
/**
 * Calculate a weighted consistency score from normalized metrics.
 * Assumes the trader has already passed validation and eligibility.
 */
const calculateScore = (metrics) => {
    const breakdown = {};
    const profitFactorResult = (0, profitFactor_score_1.scoreProfitFactor)(metrics);
    breakdown.profitFactor = profitFactorResult;
    const winRateResult = (0, winRate_score_1.scoreWinRate)(metrics);
    breakdown.winRate = winRateResult;
    const drawdownResult = (0, drawdown_score_1.scoreDrawdown)(metrics);
    breakdown.drawdown = drawdownResult;
    const activityResult = (0, activity_score_1.scoreActivity)(metrics);
    breakdown.activity = activityResult;
    const weights = score_config_1.SCORE_CONFIG.weights;
    const totalWeight = weights.profitFactor + weights.drawdown + weights.winRate + weights.activity;
    const normalizedWeights = {
        profitFactor: weights.profitFactor / totalWeight,
        drawdown: weights.drawdown / totalWeight,
        winRate: weights.winRate / totalWeight,
        activity: weights.activity / totalWeight,
    };
    let total = 0;
    total += profitFactorResult.score * normalizedWeights.profitFactor;
    total += winRateResult.score * normalizedWeights.winRate;
    total += drawdownResult.score * normalizedWeights.drawdown;
    total += activityResult.score * normalizedWeights.activity;
    const clampedTotal = (0, score_utils_1.clamp)((0, score_utils_1.roundTo)(total, 2), score_config_1.SCORE_CONFIG.caps.minTotalScore, score_config_1.SCORE_CONFIG.caps.maxTotalScore);
    return {
        totalScore: clampedTotal,
        breakdown: breakdown,
    };
};
exports.calculateScore = calculateScore;
//# sourceMappingURL=calculateScore.js.map
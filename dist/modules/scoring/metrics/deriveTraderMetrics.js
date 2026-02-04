"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveTraderMetrics = void 0;
const profitFactor_calculator_1 = require("./profitFactor.calculator");
const winRate_calculator_1 = require("./winRate.calculator");
const drawdown_calculator_1 = require("./drawdown.calculator");
const activity_calculator_1 = require("./activity.calculator");
/**
 * Aggregate individual metric calculators into a single TraderMetrics object.
 * Pure, deterministic, and independent of eligibility, scoring, and persistence.
 */
const deriveTraderMetrics = (trades, options = {}) => {
    const profitFactor = (0, profitFactor_calculator_1.calculateProfitFactorMetrics)(trades);
    const winRate = (0, winRate_calculator_1.calculateWinRateMetrics)(trades);
    const drawdown = (0, drawdown_calculator_1.calculateDrawdownMetrics)(trades);
    const activity = (0, activity_calculator_1.calculateActivityMetrics)(trades);
    return {
        activity: {
            totalTrades: activity.totalTrades,
            winningTrades: winRate.winningTrades,
            losingTrades: winRate.losingTrades,
            tradingDays: activity.tradingDays,
            avgTradesPerDay: activity.avgTradesPerDay,
        },
        performance: {
            profitFactor: profitFactor.profitFactor,
            winRatePct: winRate.winRatePct,
            totalProfit: profitFactor.grossProfit,
            totalLoss: profitFactor.grossLoss,
            averageWin: winRate.winningTrades > 0
                ? profitFactor.grossProfit / winRate.winningTrades
                : 0,
            averageLoss: winRate.losingTrades > 0
                ? profitFactor.grossLoss / winRate.losingTrades
                : 0,
            largestWin: 0,
            largestLoss: 0,
            sharpeRatio: 0,
        },
        risk: {
            currentDrawdownPct: drawdown.currentDrawdownPct,
            maxDrawdownPct: drawdown.maxDrawdownPct,
        },
        periodStart: options.periodStart,
        periodEnd: options.periodEnd,
    };
};
exports.deriveTraderMetrics = deriveTraderMetrics;
//# sourceMappingURL=deriveTraderMetrics.js.map
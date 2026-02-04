"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProfitFactorMetrics = void 0;
const trade_utils_1 = require("./trade.utils");
/**
 * Calculate gross profit, gross loss and profit factor from normalized trades.
 * Does not apply any thresholds or eligibility rules.
 */
const calculateProfitFactorMetrics = (trades) => {
    const closed = (0, trade_utils_1.filterClosedTrades)(trades);
    const grossProfit = (0, trade_utils_1.sumBy)(closed, (trade) => {
        const p = trade.profit ?? 0;
        return p > 0 ? p : 0;
    });
    const grossLoss = (0, trade_utils_1.sumBy)(closed, (trade) => {
        const p = trade.profit ?? 0;
        return p < 0 ? Math.abs(p) : 0;
    });
    let profitFactor = 0;
    if ((0, trade_utils_1.isFiniteNumber)(grossLoss) && grossLoss > 0) {
        profitFactor = grossProfit / grossLoss;
    }
    else if (grossProfit > 0 && grossLoss === 0) {
        // All wins, no losses – treat as very high but finite PF.
        profitFactor = grossProfit;
    }
    if (!(0, trade_utils_1.isFiniteNumber)(profitFactor) || profitFactor < 0) {
        profitFactor = 0;
    }
    return {
        grossProfit,
        grossLoss,
        profitFactor,
    };
};
exports.calculateProfitFactorMetrics = calculateProfitFactorMetrics;
//# sourceMappingURL=profitFactor.calculator.js.map
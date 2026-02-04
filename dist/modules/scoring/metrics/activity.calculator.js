"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateActivityMetrics = void 0;
const trade_utils_1 = require("./trade.utils");
/**
 * Calculate basic activity metrics from normalized trades.
 */
const calculateActivityMetrics = (trades) => {
    const closed = (0, trade_utils_1.filterClosedTrades)(trades);
    const totalTrades = closed.length;
    const tradingDays = (0, trade_utils_1.countDistinctTradingDays)(closed);
    const avgTradesPerDay = tradingDays === 0 ? 0 : totalTrades / Math.max(tradingDays, 1);
    return {
        totalTrades,
        tradingDays,
        avgTradesPerDay: Number.isFinite(avgTradesPerDay) && avgTradesPerDay >= 0 ? avgTradesPerDay : 0,
    };
};
exports.calculateActivityMetrics = calculateActivityMetrics;
//# sourceMappingURL=activity.calculator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDrawdownMetrics = void 0;
const trade_utils_1 = require("./trade.utils");
/**
 * Calculate drawdown metrics from a sequence of trades.
 * Uses cumulative net PnL (profit - fees) to build an equity curve.
 */
const calculateDrawdownMetrics = (trades) => {
    const closed = (0, trade_utils_1.filterClosedTrades)(trades);
    let equity = 0;
    let peak = 0;
    let trough = 0;
    let maxDrawdown = 0;
    for (const trade of closed) {
        const profit = (0, trade_utils_1.isFiniteNumber)(trade.profit) ? trade.profit : 0;
        const fees = (0, trade_utils_1.isFiniteNumber)(trade.fees) ? trade.fees : 0;
        const net = profit - fees;
        equity += net;
        if (equity > peak) {
            peak = equity;
            trough = equity;
        }
        else if (equity < trough) {
            trough = equity;
        }
        const drawdown = peak - trough;
        if (drawdown > maxDrawdown) {
            maxDrawdown = drawdown;
        }
    }
    // Convert absolute drawdown to percentage relative to peak equity.
    const currentDrawdownAbs = peak - equity;
    const denominator = peak <= 0 ? 1 : peak;
    const currentDrawdownPct = (currentDrawdownAbs / denominator) * 100;
    const maxDrawdownPct = (maxDrawdown / denominator) * 100;
    const safeCurrent = Number.isFinite(currentDrawdownPct) && currentDrawdownPct >= 0
        ? currentDrawdownPct
        : 0;
    const safeMax = Number.isFinite(maxDrawdownPct) && maxDrawdownPct >= 0 ? maxDrawdownPct : 0;
    return {
        currentDrawdownPct: safeCurrent,
        maxDrawdownPct: safeMax,
    };
};
exports.calculateDrawdownMetrics = calculateDrawdownMetrics;
//# sourceMappingURL=drawdown.calculator.js.map
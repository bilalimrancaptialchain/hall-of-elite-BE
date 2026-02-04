"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWinRateMetrics = void 0;
const trade_utils_1 = require("./trade.utils");
/**
 * Calculate win/loss counts and win rate from normalized trades.
 * Breakeven trades (profit exactly 0) are excluded from the ratio.
 */
const calculateWinRateMetrics = (trades) => {
    const closed = (0, trade_utils_1.filterClosedTrades)(trades);
    let winningTrades = 0;
    let losingTrades = 0;
    let consideredTrades = 0;
    for (const trade of closed) {
        const p = trade.profit ?? 0;
        if (!(0, trade_utils_1.isFiniteNumber)(p))
            continue;
        if (p > 0) {
            winningTrades += 1;
            consideredTrades += 1;
        }
        else if (p < 0) {
            losingTrades += 1;
            consideredTrades += 1;
        }
        // profit === 0 is treated as breakeven and ignored
    }
    const winRatePct = consideredTrades === 0 ? 0 : (winningTrades / consideredTrades) * 100;
    return {
        totalTrades: closed.length,
        winningTrades,
        losingTrades,
        winRatePct: Number.isFinite(winRatePct) && winRatePct >= 0 ? winRatePct : 0,
    };
};
exports.calculateWinRateMetrics = calculateWinRateMetrics;
//# sourceMappingURL=winRate.calculator.js.map
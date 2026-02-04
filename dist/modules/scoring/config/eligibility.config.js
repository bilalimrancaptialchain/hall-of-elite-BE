"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELIGIBILITY_RULES = void 0;
/**
 * Hard consistency rules for trader eligibility.
 * All values are declarative thresholds; no calculations or logic.
 */
exports.ELIGIBILITY_RULES = {
    /**
     * Minimum distinct trading days required for a trader to be considered.
     */
    minTradingDays: 30,
    /**
     * Minimum number of closed trades required for evaluation.
     */
    minTotalTrades: 20,
    /**
     * Minimum acceptable profit factor (gross profit / gross loss).
     */
    minProfitFactor: 1.2,
    /**
     * Maximum allowed peak-to-valley drawdown, in percentage points (0–100).
     */
    maxDrawdownPct: 25,
    /**
     * Minimum required win rate, in percentage points (0–100).
     */
    minWinRatePct: 50,
};
//# sourceMappingURL=eligibility.config.js.map
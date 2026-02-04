"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCORING_WEIGHTS = void 0;
/**
 * Relative importance of each metric in the final consistency score.
 * Values are expressed in percentage points and MUST always sum to 100.
 */
exports.SCORING_WEIGHTS = {
    /**
     * Profit factor – how efficiently the trader converts risk into return.
     */
    profitFactor: 35,
    /**
     * Drawdown (inverse weight) – penalises large equity declines.
     */
    drawdownPct: 25,
    /**
     * Win rate – percentage of winning trades.
     */
    winRatePct: 25,
    /**
     * Trading days – rewards long-term, consistent activity.
     */
    tradingDays: 15,
};
//# sourceMappingURL=weights.config.js.map
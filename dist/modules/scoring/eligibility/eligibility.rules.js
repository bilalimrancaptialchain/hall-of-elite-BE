"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELIGIBILITY_RULES_SEQUENCE = exports.checkMinWinRate = exports.checkMaxDrawdown = exports.checkMinProfitFactor = exports.checkMinTotalTrades = exports.checkMinTradingDays = void 0;
const scoring_types_1 = require("../config/scoring.types");
const eligibility_config_1 = require("./eligibility.config");
const eligibility_types_1 = require("./eligibility.types");
const buildFailure = (code, ruleKey, message) => ({
    code,
    ruleKey,
    message,
});
const checkMinTradingDays = (metrics) => {
    const { minTradingDays } = eligibility_config_1.ELIGIBILITY_CONFIG.thresholds;
    if (metrics.tradingDays >= minTradingDays) {
        return null;
    }
    return buildFailure(eligibility_types_1.EligibilityFailureCode.MIN_TRADING_DAYS, scoring_types_1.EligibilityRuleKey.MIN_TRADING_DAYS, `Requires at least ${minTradingDays} distinct trading days`);
};
exports.checkMinTradingDays = checkMinTradingDays;
const checkMinTotalTrades = (metrics) => {
    const { minTotalTrades } = eligibility_config_1.ELIGIBILITY_CONFIG.thresholds;
    if (metrics.totalTrades >= minTotalTrades) {
        return null;
    }
    return buildFailure(eligibility_types_1.EligibilityFailureCode.MIN_TOTAL_TRADES, scoring_types_1.EligibilityRuleKey.MIN_TOTAL_TRADES, `Requires at least ${minTotalTrades} closed trades`);
};
exports.checkMinTotalTrades = checkMinTotalTrades;
const checkMinProfitFactor = (metrics) => {
    const { minProfitFactor } = eligibility_config_1.ELIGIBILITY_CONFIG.thresholds;
    if (metrics.profitFactor >= minProfitFactor) {
        return null;
    }
    return buildFailure(eligibility_types_1.EligibilityFailureCode.MIN_PROFIT_FACTOR, scoring_types_1.EligibilityRuleKey.MIN_PROFIT_FACTOR, `Requires profit factor of at least ${minProfitFactor}`);
};
exports.checkMinProfitFactor = checkMinProfitFactor;
const checkMaxDrawdown = (metrics) => {
    const { maxDrawdownPct } = eligibility_config_1.ELIGIBILITY_CONFIG.thresholds;
    if (metrics.drawdownPct <= maxDrawdownPct) {
        return null;
    }
    return buildFailure(eligibility_types_1.EligibilityFailureCode.MAX_DRAWDOWN_PCT, scoring_types_1.EligibilityRuleKey.MAX_DRAWDOWN_PCT, `Drawdown must not exceed ${maxDrawdownPct}%`);
};
exports.checkMaxDrawdown = checkMaxDrawdown;
const checkMinWinRate = (metrics) => {
    const { minWinRatePct } = eligibility_config_1.ELIGIBILITY_CONFIG.thresholds;
    if (metrics.winRatePct >= minWinRatePct) {
        return null;
    }
    return buildFailure(eligibility_types_1.EligibilityFailureCode.MIN_WIN_RATE_PCT, scoring_types_1.EligibilityRuleKey.MIN_WIN_RATE_PCT, `Requires win rate of at least ${minWinRatePct}%`);
};
exports.checkMinWinRate = checkMinWinRate;
/**
 * Ordered list of rule functions applied by the eligibility gate.
 * Easy to extend in the future without changing orchestration code.
 */
exports.ELIGIBILITY_RULES_SEQUENCE = [
    exports.checkMinTradingDays,
    exports.checkMinTotalTrades,
    exports.checkMinProfitFactor,
    exports.checkMaxDrawdown,
    exports.checkMinWinRate,
];
//# sourceMappingURL=eligibility.rules.js.map
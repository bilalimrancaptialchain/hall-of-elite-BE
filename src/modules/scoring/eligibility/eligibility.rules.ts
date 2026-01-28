import { EligibilityRuleKey } from "../config/scoring.types";
import { ELIGIBILITY_CONFIG } from "./eligibility.config";
import {
  EligibilityContext,
  EligibilityFailureCode,
  EligibilityFailureReason,
  EligibilityMetrics,
} from "./eligibility.types";

type RuleFn = (metrics: EligibilityMetrics, context?: EligibilityContext) => EligibilityFailureReason | null;

const buildFailure = (
  code: EligibilityFailureCode,
  ruleKey: EligibilityRuleKey,
  message: string
): EligibilityFailureReason => ({
  code,
  ruleKey,
  message,
});

export const checkMinTradingDays: RuleFn = (metrics) => {
  const { minTradingDays } = ELIGIBILITY_CONFIG.thresholds;
  if (metrics.tradingDays >= minTradingDays) {
    return null;
  }
  return buildFailure(
    EligibilityFailureCode.MIN_TRADING_DAYS,
    EligibilityRuleKey.MIN_TRADING_DAYS,
    `Requires at least ${minTradingDays} distinct trading days`
  );
};

export const checkMinTotalTrades: RuleFn = (metrics) => {
  const { minTotalTrades } = ELIGIBILITY_CONFIG.thresholds;
  if (metrics.totalTrades >= minTotalTrades) {
    return null;
  }
  return buildFailure(
    EligibilityFailureCode.MIN_TOTAL_TRADES,
    EligibilityRuleKey.MIN_TOTAL_TRADES,
    `Requires at least ${minTotalTrades} closed trades`
  );
};

export const checkMinProfitFactor: RuleFn = (metrics) => {
  const { minProfitFactor } = ELIGIBILITY_CONFIG.thresholds;
  if (metrics.profitFactor >= minProfitFactor) {
    return null;
  }
  return buildFailure(
    EligibilityFailureCode.MIN_PROFIT_FACTOR,
    EligibilityRuleKey.MIN_PROFIT_FACTOR,
    `Requires profit factor of at least ${minProfitFactor}`
  );
};

export const checkMaxDrawdown: RuleFn = (metrics) => {
  const { maxDrawdownPct } = ELIGIBILITY_CONFIG.thresholds;
  if (metrics.drawdownPct <= maxDrawdownPct) {
    return null;
  }
  return buildFailure(
    EligibilityFailureCode.MAX_DRAWDOWN_PCT,
    EligibilityRuleKey.MAX_DRAWDOWN_PCT,
    `Drawdown must not exceed ${maxDrawdownPct}%`
  );
};

export const checkMinWinRate: RuleFn = (metrics) => {
  const { minWinRatePct } = ELIGIBILITY_CONFIG.thresholds;
  if (metrics.winRatePct >= minWinRatePct) {
    return null;
  }
  return buildFailure(
    EligibilityFailureCode.MIN_WIN_RATE_PCT,
    EligibilityRuleKey.MIN_WIN_RATE_PCT,
    `Requires win rate of at least ${minWinRatePct}%`
  );
};

/**
 * Ordered list of rule functions applied by the eligibility gate.
 * Easy to extend in the future without changing orchestration code.
 */
export const ELIGIBILITY_RULES_SEQUENCE: readonly RuleFn[] = [
  checkMinTradingDays,
  checkMinTotalTrades,
  checkMinProfitFactor,
  checkMaxDrawdown,
  checkMinWinRate,
] as const;

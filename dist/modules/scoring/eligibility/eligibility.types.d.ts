import { EligibilityRuleKey } from "../config/scoring.types";
export interface EligibilityContext {
    readonly traderId?: string;
}
export declare enum EligibilityFailureCode {
    MIN_TRADING_DAYS = "MIN_TRADING_DAYS",
    MIN_TOTAL_TRADES = "MIN_TOTAL_TRADES",
    MIN_PROFIT_FACTOR = "MIN_PROFIT_FACTOR",
    MAX_DRAWDOWN_PCT = "MAX_DRAWDOWN_PCT",
    MIN_WIN_RATE_PCT = "MIN_WIN_RATE_PCT"
}
export interface EligibilityFailureReason {
    readonly code: EligibilityFailureCode;
    readonly ruleKey: EligibilityRuleKey;
    readonly message: string;
}
export interface EligibilityResult {
    readonly eligible: boolean;
    readonly failedRules: EligibilityFailureReason[];
}
/**
 * Minimal metrics shape required by the eligibility gate.
 * Values must already be normalized/sanitized (no NaN/Infinity).
 */
export interface EligibilityMetrics {
    readonly tradingDays: number;
    readonly totalTrades: number;
    readonly profitFactor: number;
    readonly drawdownPct: number;
    readonly winRatePct: number;
}
//# sourceMappingURL=eligibility.types.d.ts.map
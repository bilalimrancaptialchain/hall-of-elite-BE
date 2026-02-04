import { EligibilityContext, EligibilityFailureReason, EligibilityMetrics } from "./eligibility.types";
type RuleFn = (metrics: EligibilityMetrics, context?: EligibilityContext) => EligibilityFailureReason | null;
export declare const checkMinTradingDays: RuleFn;
export declare const checkMinTotalTrades: RuleFn;
export declare const checkMinProfitFactor: RuleFn;
export declare const checkMaxDrawdown: RuleFn;
export declare const checkMinWinRate: RuleFn;
/**
 * Ordered list of rule functions applied by the eligibility gate.
 * Easy to extend in the future without changing orchestration code.
 */
export declare const ELIGIBILITY_RULES_SEQUENCE: readonly RuleFn[];
export {};
//# sourceMappingURL=eligibility.rules.d.ts.map
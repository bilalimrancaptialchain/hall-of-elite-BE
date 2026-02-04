import { EligibilityContext, EligibilityMetrics, EligibilityResult } from "./eligibility.types";
/**
 * Apply all consistency eligibility rules to a trader's metrics.
 * Assumes metrics have already passed raw validation & normalization.
 */
export declare const checkEligibility: (metrics: EligibilityMetrics, _context?: EligibilityContext) => EligibilityResult;
//# sourceMappingURL=checkEligibility.d.ts.map
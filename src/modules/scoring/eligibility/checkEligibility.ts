import { ELIGIBILITY_RULES_SEQUENCE } from "./eligibility.rules";
import { EligibilityContext, EligibilityMetrics, EligibilityResult } from "./eligibility.types";

/**
 * Apply all consistency eligibility rules to a trader's metrics.
 * Assumes metrics have already passed raw validation & normalization.
 */
export const checkEligibility = (
  metrics: EligibilityMetrics,
  _context?: EligibilityContext
): EligibilityResult => {
  const failedRules = [];

  for (const rule of ELIGIBILITY_RULES_SEQUENCE) {
    const failure = rule(metrics, _context);
    if (failure) {
      failedRules.push(failure);
    }
  }

  return {
    eligible: failedRules.length === 0,
    failedRules,
  };
};

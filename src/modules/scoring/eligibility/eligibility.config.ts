import { ELIGIBILITY_RULES } from "../config/eligibility.config";
import { EligibilityRuleKey } from "../config/scoring.types";

/**
 * Snapshot of the current eligibility rule thresholds,
 * re-exported in a form specific to the eligibility module.
 *
 * This indirection makes it easy to plug in an admin-driven
 * config source later without changing rule logic.
 */
export const ELIGIBILITY_CONFIG = {
  ruleKeys: EligibilityRuleKey,
  thresholds: ELIGIBILITY_RULES,
} as const;

export type EligibilityConfig = typeof ELIGIBILITY_CONFIG;

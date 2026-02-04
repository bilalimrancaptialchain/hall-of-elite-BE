import { EligibilityRuleKey } from "../config/scoring.types";
/**
 * Snapshot of the current eligibility rule thresholds,
 * re-exported in a form specific to the eligibility module.
 *
 * This indirection makes it easy to plug in an admin-driven
 * config source later without changing rule logic.
 */
export declare const ELIGIBILITY_CONFIG: {
    readonly ruleKeys: typeof EligibilityRuleKey;
    readonly thresholds: Readonly<import("../config/scoring.types").EligibilityRulesConfig>;
};
export type EligibilityConfig = typeof ELIGIBILITY_CONFIG;
//# sourceMappingURL=eligibility.config.d.ts.map
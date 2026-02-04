"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELIGIBILITY_CONFIG = void 0;
const eligibility_config_1 = require("../config/eligibility.config");
const scoring_types_1 = require("../config/scoring.types");
/**
 * Snapshot of the current eligibility rule thresholds,
 * re-exported in a form specific to the eligibility module.
 *
 * This indirection makes it easy to plug in an admin-driven
 * config source later without changing rule logic.
 */
exports.ELIGIBILITY_CONFIG = {
    ruleKeys: scoring_types_1.EligibilityRuleKey,
    thresholds: eligibility_config_1.ELIGIBILITY_RULES,
};
//# sourceMappingURL=eligibility.config.js.map
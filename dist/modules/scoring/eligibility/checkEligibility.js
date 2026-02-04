"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEligibility = void 0;
const eligibility_rules_1 = require("./eligibility.rules");
/**
 * Apply all consistency eligibility rules to a trader's metrics.
 * Assumes metrics have already passed raw validation & normalization.
 */
const checkEligibility = (metrics, _context) => {
    const failedRules = [];
    for (const rule of eligibility_rules_1.ELIGIBILITY_RULES_SEQUENCE) {
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
exports.checkEligibility = checkEligibility;
//# sourceMappingURL=checkEligibility.js.map
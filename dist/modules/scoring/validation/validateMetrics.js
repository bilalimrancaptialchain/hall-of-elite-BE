"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMetrics = void 0;
const validation_types_1 = require("./validation.types");
const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);
const baseContext = (overrides) => ({
    domain: "METRICS",
    ...overrides,
});
const buildError = (code, message, context) => ({
    code,
    message,
    context: context ? baseContext(context) : baseContext({}),
});
/**
 * Validate precomputed trader metrics for structural and numeric safety.
 * No scoring or eligibility logic is performed here.
 */
const validateMetrics = (metrics, context) => {
    const errors = [];
    try {
        if (!metrics) {
            // Metrics are optional; absence is not considered invalid here.
            return { valid: true, errors };
        }
        const { profitFactor, winRatePct, drawdownPct, totalTrades, totalTradingDays, grossProfit, grossLoss, } = metrics;
        const traderId = context?.traderId;
        const checkNumeric = (value, field) => {
            if (value === null || value === undefined)
                return;
            if (!isFiniteNumber(value)) {
                errors.push(buildError(validation_types_1.ValidationErrorCode.METRICS_INVALID_NUMERIC, `Metric ${field} must be a finite number`, { traderId, field }));
            }
        };
        checkNumeric(profitFactor, "profitFactor");
        checkNumeric(winRatePct, "winRatePct");
        checkNumeric(drawdownPct, "drawdownPct");
        checkNumeric(totalTrades, "totalTrades");
        checkNumeric(totalTradingDays, "totalTradingDays");
        checkNumeric(grossProfit, "grossProfit");
        checkNumeric(grossLoss, "grossLoss");
        // Bounds & sanity checks
        if (isFiniteNumber(drawdownPct) && (drawdownPct < 0 || drawdownPct > 100)) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.METRICS_INVALID_DRAWDOWN, "Drawdown percentage must be between 0 and 100", { traderId, field: "drawdownPct" }));
        }
        if (isFiniteNumber(winRatePct) && (winRatePct < 0 || winRatePct > 100)) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.METRICS_INVALID_NUMERIC, "Win rate percentage must be between 0 and 100", { traderId, field: "winRatePct" }));
        }
        if (isFiniteNumber(totalTrades) && totalTrades < 0) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.METRICS_INVALID_COUNTS, "Total trades cannot be negative", { traderId, field: "totalTrades" }));
        }
        if (isFiniteNumber(totalTradingDays) && totalTradingDays < 0) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.METRICS_INVALID_COUNTS, "Total trading days cannot be negative", { traderId, field: "totalTradingDays" }));
        }
        if (isFiniteNumber(grossProfit) &&
            isFiniteNumber(grossLoss) &&
            grossProfit <= 0 &&
            grossLoss <= 0) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.METRICS_INVALID_NUMERIC, "Gross profit and gross loss cannot both be non-positive", { traderId }));
        }
    }
    catch {
        errors.push(buildError(validation_types_1.ValidationErrorCode.METRICS_INVALID_NUMERIC, "Unexpected error while validating metrics", { traderId: context?.traderId }));
    }
    return {
        valid: errors.length === 0,
        errors,
    };
};
exports.validateMetrics = validateMetrics;
//# sourceMappingURL=validateMetrics.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTraderData = exports.validateTraderCore = void 0;
const validation_types_1 = require("./validation.types");
const validateTrades_1 = require("./validateTrades");
const validateMetrics_1 = require("./validateMetrics");
const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const baseContext = (overrides) => ({
    domain: "TRADER",
    ...overrides,
});
const buildError = (code, message, context) => ({
    code,
    message,
    context: context ? baseContext(context) : baseContext({}),
});
/**
 * Validate basic trader-level fields (ID, status, metadata).
 * Does NOT touch trades or metrics.
 */
const validateTraderCore = (trader) => {
    const errors = [];
    try {
        if (!trader) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.TRADER_MISSING_ID, "Trader record is missing", {}));
            return { valid: false, errors };
        }
        const traderId = trader.id ?? undefined;
        if (!isNonEmptyString(trader.id)) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.TRADER_MISSING_ID, "Trader ID is missing or empty", {
                traderId,
                field: "id",
            }));
        }
        const status = (trader.status ?? "").toString().toUpperCase();
        if (status && status !== "ACTIVE") {
            errors.push(buildError(validation_types_1.ValidationErrorCode.TRADER_INACTIVE, "Trader is not active", {
                traderId,
                field: "status",
            }));
        }
        if (trader.metadata === null || trader.metadata === undefined) {
            errors.push(buildError(validation_types_1.ValidationErrorCode.TRADER_MISSING_METADATA, "Trader metadata is missing", { traderId, field: "metadata" }));
        }
    }
    catch {
        errors.push(buildError(validation_types_1.ValidationErrorCode.TRADER_MISSING_ID, "Unexpected error while validating trader core data", {}));
    }
    return {
        valid: errors.length === 0,
        errors,
    };
};
exports.validateTraderCore = validateTraderCore;
/**
 * Aggregated validator that combines trader, trades and metrics validation.
 * Collects all errors and NEVER throws.
 */
const validateTraderData = (trader, trades, metrics) => {
    const allErrors = [];
    try {
        const coreResult = (0, exports.validateTraderCore)(trader);
        allErrors.push(...coreResult.errors);
        const traderId = trader?.id ?? undefined;
        const tradesResult = (0, validateTrades_1.validateTrades)(trades, { traderId });
        allErrors.push(...tradesResult.errors);
        const metricsResult = (0, validateMetrics_1.validateMetrics)(metrics, { traderId });
        allErrors.push(...metricsResult.errors);
    }
    catch {
        allErrors.push(buildError(validation_types_1.ValidationErrorCode.TRADER_MISSING_ID, "Unexpected error while validating trader data", { traderId: trader?.id ?? undefined }));
    }
    return {
        valid: allErrors.length === 0,
        errors: allErrors,
    };
};
exports.validateTraderData = validateTraderData;
//# sourceMappingURL=validateTraderData.js.map
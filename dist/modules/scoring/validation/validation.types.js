"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorCode = void 0;
/**
 * Canonical validation error codes.
 * These are internal-only and never exposed directly to the frontend.
 */
var ValidationErrorCode;
(function (ValidationErrorCode) {
    // Trader-level
    ValidationErrorCode["TRADER_MISSING_ID"] = "TRADER_MISSING_ID";
    ValidationErrorCode["TRADER_INACTIVE"] = "TRADER_INACTIVE";
    ValidationErrorCode["TRADER_MISSING_METADATA"] = "TRADER_MISSING_METADATA";
    // Trades-level
    ValidationErrorCode["TRADES_MISSING"] = "TRADES_MISSING";
    ValidationErrorCode["TRADES_EMPTY"] = "TRADES_EMPTY";
    ValidationErrorCode["TRADE_INVALID_TIMESTAMP"] = "TRADE_INVALID_TIMESTAMP";
    ValidationErrorCode["TRADE_INVALID_NUMERIC"] = "TRADE_INVALID_NUMERIC";
    ValidationErrorCode["TRADE_INVALID_SYMBOL"] = "TRADE_INVALID_SYMBOL";
    ValidationErrorCode["TRADE_INVALID_VOLUME"] = "TRADE_INVALID_VOLUME";
    // Metrics-level
    ValidationErrorCode["METRICS_INVALID_NUMERIC"] = "METRICS_INVALID_NUMERIC";
    ValidationErrorCode["METRICS_INVALID_DRAWDOWN"] = "METRICS_INVALID_DRAWDOWN";
    ValidationErrorCode["METRICS_INVALID_COUNTS"] = "METRICS_INVALID_COUNTS";
})(ValidationErrorCode || (exports.ValidationErrorCode = ValidationErrorCode = {}));
//# sourceMappingURL=validation.types.js.map
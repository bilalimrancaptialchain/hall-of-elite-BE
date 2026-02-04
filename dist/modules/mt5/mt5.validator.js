"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTradesQuerySchema = exports.getTradesParamsSchema = void 0;
/**
 * MT5 validators.
 * Created to validate MT5 route params and query strings.
 */
const zod_1 = require("zod");
/**
 * Validator for MT5 route parameters
 */
exports.getTradesParamsSchema = zod_1.z.object({
    accountId: zod_1.z.string().min(1, "Account ID is required"),
});
/**
 * Validator for MT5 query parameters (trades with date range)
 */
exports.getTradesQuerySchema = zod_1.z.object({
    startDate: zod_1.z
        .string()
        .optional()
        .refine((val) => {
        if (!val)
            return true;
        const date = new Date(val);
        return !isNaN(date.getTime());
    }, { message: "Invalid startDate format. Use ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)" }),
    endDate: zod_1.z
        .string()
        .optional()
        .refine((val) => {
        if (!val)
            return true;
        const date = new Date(val);
        return !isNaN(date.getTime());
    }, { message: "Invalid endDate format. Use ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)" }),
});
//# sourceMappingURL=mt5.validator.js.map
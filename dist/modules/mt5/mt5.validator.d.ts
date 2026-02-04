/**
 * MT5 validators.
 * Created to validate MT5 route params and query strings.
 */
import { z } from "zod";
/**
 * Validator for MT5 route parameters
 */
export declare const getTradesParamsSchema: z.ZodObject<{
    accountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
}, {
    accountId: string;
}>;
/**
 * Validator for MT5 query parameters (trades with date range)
 */
export declare const getTradesQuerySchema: z.ZodObject<{
    startDate: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    endDate: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
//# sourceMappingURL=mt5.validator.d.ts.map
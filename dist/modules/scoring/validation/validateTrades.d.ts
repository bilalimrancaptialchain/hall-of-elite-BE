import { TradeValidationInput, ValidationResult } from "./validation.types";
/**
 * Validate a collection of closed trades for structural and numeric safety.
 * Does NOT compute any metrics; only validates the raw data.
 */
export declare const validateTrades: (trades: TradeValidationInput[] | null | undefined, context?: {
    traderId?: string;
    accountId?: string;
}) => ValidationResult;
//# sourceMappingURL=validateTrades.d.ts.map
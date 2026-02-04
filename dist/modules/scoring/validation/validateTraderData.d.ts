import { MetricsValidationInput, TradeValidationInput, TraderValidationInput, ValidationResult } from "./validation.types";
/**
 * Validate basic trader-level fields (ID, status, metadata).
 * Does NOT touch trades or metrics.
 */
export declare const validateTraderCore: (trader: TraderValidationInput | null | undefined) => ValidationResult;
/**
 * Aggregated validator that combines trader, trades and metrics validation.
 * Collects all errors and NEVER throws.
 */
export declare const validateTraderData: (trader: TraderValidationInput | null | undefined, trades: TradeValidationInput[] | null | undefined, metrics: MetricsValidationInput | null | undefined) => ValidationResult;
//# sourceMappingURL=validateTraderData.d.ts.map
import { MetricsValidationInput, ValidationResult } from "./validation.types";
/**
 * Validate precomputed trader metrics for structural and numeric safety.
 * No scoring or eligibility logic is performed here.
 */
export declare const validateMetrics: (metrics: MetricsValidationInput | null | undefined, context?: {
    traderId?: string;
}) => ValidationResult;
//# sourceMappingURL=validateMetrics.d.ts.map
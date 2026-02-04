/**
 * Clamp a numeric value between min and max.
 */
export declare const clamp: (value: number, min: number, max: number) => number;
/**
 * Normalize a value within [min, max] to a 0–100 scale.
 * Values outside [min, max] are clamped before normalization.
 */
export declare const normalizeRange: (value: number, min: number, max: number) => number;
/**
 * Inverse normalization where lower values are better.
 * Example: drawdown – 0% is best, higher % is worse.
 */
export declare const normalizeInverseRange: (value: number, min: number, max: number) => number;
/**
 * Safe division that guards against division by zero.
 */
export declare const safeDivide: (numerator: number, denominator: number) => number;
/**
 * Round a number to a fixed precision.
 */
export declare const roundTo: (value: number, precision: number) => number;
//# sourceMappingURL=score.utils.d.ts.map
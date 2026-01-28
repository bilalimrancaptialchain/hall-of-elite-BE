/**
 * Clamp a numeric value between min and max.
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Normalize a value within [min, max] to a 0–100 scale.
 * Values outside [min, max] are clamped before normalization.
 */
export const normalizeRange = (value: number, min: number, max: number): number => {
  if (max <= min) {
    return 0;
  }
  const clamped = clamp(value, min, max);
  return ((clamped - min) / (max - min)) * 100;
};

/**
 * Inverse normalization where lower values are better.
 * Example: drawdown – 0% is best, higher % is worse.
 */
export const normalizeInverseRange = (value: number, min: number, max: number): number => {
  const normalized = normalizeRange(value, min, max);
  return 100 - normalized;
};

/**
 * Safe division that guards against division by zero.
 */
export const safeDivide = (numerator: number, denominator: number): number => {
  if (denominator === 0) {
    return 0;
  }
  return numerator / denominator;
};

/**
 * Round a number to a fixed precision.
 */
export const roundTo = (value: number, precision: number): number => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

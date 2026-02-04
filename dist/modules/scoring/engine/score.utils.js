"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundTo = exports.safeDivide = exports.normalizeInverseRange = exports.normalizeRange = exports.clamp = void 0;
/**
 * Clamp a numeric value between min and max.
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
exports.clamp = clamp;
/**
 * Normalize a value within [min, max] to a 0–100 scale.
 * Values outside [min, max] are clamped before normalization.
 */
const normalizeRange = (value, min, max) => {
    if (max <= min) {
        return 0;
    }
    const clamped = (0, exports.clamp)(value, min, max);
    return ((clamped - min) / (max - min)) * 100;
};
exports.normalizeRange = normalizeRange;
/**
 * Inverse normalization where lower values are better.
 * Example: drawdown – 0% is best, higher % is worse.
 */
const normalizeInverseRange = (value, min, max) => {
    const normalized = (0, exports.normalizeRange)(value, min, max);
    return 100 - normalized;
};
exports.normalizeInverseRange = normalizeInverseRange;
/**
 * Safe division that guards against division by zero.
 */
const safeDivide = (numerator, denominator) => {
    if (denominator === 0) {
        return 0;
    }
    return numerator / denominator;
};
exports.safeDivide = safeDivide;
/**
 * Round a number to a fixed precision.
 */
const roundTo = (value, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
};
exports.roundTo = roundTo;
//# sourceMappingURL=score.utils.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterClosedTrades = exports.sumBy = exports.isFiniteNumber = exports.countDistinctTradingDays = exports.msToDays = exports.getTradeDurationMs = exports.toSafeDate = void 0;
/**
 * Safely parse a Date or ISO string into a Date instance.
 * Returns null if the value is missing or invalid.
 */
const toSafeDate = (value) => {
    if (!value)
        return null;
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};
exports.toSafeDate = toSafeDate;
/**
 * Compute trade duration in milliseconds.
 * Returns null if either timestamp is invalid or missing.
 */
const getTradeDurationMs = (trade) => {
    const open = (0, exports.toSafeDate)(trade.openTime);
    const close = (0, exports.toSafeDate)(trade.closeTime ?? null);
    if (!open || !close) {
        return null;
    }
    return Math.max(0, close.getTime() - open.getTime());
};
exports.getTradeDurationMs = getTradeDurationMs;
/**
 * Convert milliseconds into whole days (floor).
 */
const msToDays = (ms) => {
    if (!Number.isFinite(ms) || ms <= 0) {
        return 0;
    }
    const oneDayMs = 24 * 60 * 60 * 1000;
    return Math.floor(ms / oneDayMs);
};
exports.msToDays = msToDays;
/**
 * Compute the number of distinct trading days represented
 * by a collection of trades, based on their closeTime.
 */
const countDistinctTradingDays = (trades) => {
    const days = new Set();
    for (const trade of trades) {
        const close = (0, exports.toSafeDate)(trade.closeTime ?? null);
        if (!close)
            continue;
        days.add(close.toISOString().slice(0, 10));
    }
    return days.size;
};
exports.countDistinctTradingDays = countDistinctTradingDays;
/**
 * Simple finite-number guard.
 */
const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);
exports.isFiniteNumber = isFiniteNumber;
/**
 * Sum a numeric projection over trades, skipping invalid values.
 */
const sumBy = (trades, selector) => {
    let total = 0;
    for (const trade of trades) {
        const value = selector(trade);
        if ((0, exports.isFiniteNumber)(value)) {
            total += value;
        }
    }
    return total;
};
exports.sumBy = sumBy;
/**
 * Filter a list of trades down to those that have a valid closeTime.
 */
const filterClosedTrades = (trades) => trades.filter((trade) => (0, exports.toSafeDate)(trade.closeTime ?? null) !== null);
exports.filterClosedTrades = filterClosedTrades;
//# sourceMappingURL=trade.utils.js.map
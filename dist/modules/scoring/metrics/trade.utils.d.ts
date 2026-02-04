import { TradeLike } from "./trade.types";
/**
 * Safely parse a Date or ISO string into a Date instance.
 * Returns null if the value is missing or invalid.
 */
export declare const toSafeDate: (value: Date | string | null | undefined) => Date | null;
/**
 * Compute trade duration in milliseconds.
 * Returns null if either timestamp is invalid or missing.
 */
export declare const getTradeDurationMs: (trade: TradeLike) => number | null;
/**
 * Convert milliseconds into whole days (floor).
 */
export declare const msToDays: (ms: number) => number;
/**
 * Compute the number of distinct trading days represented
 * by a collection of trades, based on their closeTime.
 */
export declare const countDistinctTradingDays: (trades: readonly TradeLike[]) => number;
/**
 * Simple finite-number guard.
 */
export declare const isFiniteNumber: (value: unknown) => value is number;
/**
 * Sum a numeric projection over trades, skipping invalid values.
 */
export declare const sumBy: (trades: readonly TradeLike[], selector: (trade: TradeLike) => number | null | undefined) => number;
/**
 * Filter a list of trades down to those that have a valid closeTime.
 */
export declare const filterClosedTrades: (trades: readonly TradeLike[]) => TradeLike[];
//# sourceMappingURL=trade.utils.d.ts.map
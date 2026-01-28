import { TradeLike } from "./trade.types";

/**
 * Safely parse a Date or ISO string into a Date instance.
 * Returns null if the value is missing or invalid.
 */
export const toSafeDate = (value: Date | string | null | undefined): Date | null => {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

/**
 * Compute trade duration in milliseconds.
 * Returns null if either timestamp is invalid or missing.
 */
export const getTradeDurationMs = (trade: TradeLike): number | null => {
  const open = toSafeDate(trade.openTime);
  const close = toSafeDate(trade.closeTime ?? null);

  if (!open || !close) {
    return null;
  }

  return Math.max(0, close.getTime() - open.getTime());
};

/**
 * Convert milliseconds into whole days (floor).
 */
export const msToDays = (ms: number): number => {
  if (!Number.isFinite(ms) || ms <= 0) {
    return 0;
  }
  const oneDayMs = 24 * 60 * 60 * 1000;
  return Math.floor(ms / oneDayMs);
};

/**
 * Compute the number of distinct trading days represented
 * by a collection of trades, based on their closeTime.
 */
export const countDistinctTradingDays = (trades: readonly TradeLike[]): number => {
  const days = new Set<string>();

  for (const trade of trades) {
    const close = toSafeDate(trade.closeTime ?? null);
    if (!close) continue;
    days.add(close.toISOString().slice(0, 10));
  }

  return days.size;
};

/**
 * Simple finite-number guard.
 */
export const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

/**
 * Sum a numeric projection over trades, skipping invalid values.
 */
export const sumBy = (
  trades: readonly TradeLike[],
  selector: (trade: TradeLike) => number | null | undefined
): number => {
  let total = 0;
  for (const trade of trades) {
    const value = selector(trade);
    if (isFiniteNumber(value)) {
      total += value;
    }
  }
  return total;
};

/**
 * Filter a list of trades down to those that have a valid closeTime.
 */
export const filterClosedTrades = (trades: readonly TradeLike[]): TradeLike[] =>
  trades.filter((trade) => toSafeDate(trade.closeTime ?? null) !== null);

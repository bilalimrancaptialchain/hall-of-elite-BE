import { ScoredTraderInput } from "./ranking.types";

/**
 * Stable sort implementation that preserves input order for equal keys.
 */
export const stableSort = <T>(
  items: readonly T[],
  compare: (a: T, b: T) => number
): T[] => {
  return items
    .map((value, index) => ({ value, index }))
    .sort((a, b) => {
      const order = compare(a.value, b.value);
      return order !== 0 ? order : a.index - b.index;
    })
    .map((entry) => entry.value);
};

/**
 * Default tie-breaking strategy for scored traders:
 * 1) Higher score
 * 2) Higher profit factor (if present)
 * 3) Lower drawdown percentage (if present)
 * 4) Lexicographical traderId
 */
export const compareScoredTraders = (
  a: ScoredTraderInput,
  b: ScoredTraderInput
): number => {
  if (a.score !== b.score) {
    return b.score - a.score;
  }

  if (a.profitFactor !== undefined && b.profitFactor !== undefined) {
    if (a.profitFactor !== b.profitFactor) {
      return (b.profitFactor ?? 0) - (a.profitFactor ?? 0);
    }
  }

  if (a.drawdownPct !== undefined && b.drawdownPct !== undefined) {
    if (a.drawdownPct !== b.drawdownPct) {
      return (a.drawdownPct ?? 0) - (b.drawdownPct ?? 0);
    }
  }

  return a.traderId.localeCompare(b.traderId);
};

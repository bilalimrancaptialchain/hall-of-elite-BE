import { ScoredTraderInput, RankedTrader } from "./ranking.types";
import { compareScoredTraders, stableSort } from "./ranking.utils";

/**
 * Rank traders by score (and tie-breakers) in a deterministic way.
 * Input is not mutated.
 */
export const rankTraders = (traders: readonly ScoredTraderInput[]): RankedTrader[] => {
  const sorted = stableSort(traders, compareScoredTraders);

  return sorted.map((trader, index) => ({
    ...trader,
    rank: index + 1,
  }));
};

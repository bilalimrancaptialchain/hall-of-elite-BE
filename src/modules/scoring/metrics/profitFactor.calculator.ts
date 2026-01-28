import { TradeLike } from "./trade.types";
import { filterClosedTrades, isFiniteNumber, sumBy } from "./trade.utils";

export interface ProfitFactorMetrics {
  /** Gross profit across all winning trades (account currency). */
  readonly grossProfit: number;
  /** Gross loss across all losing trades (absolute value, account currency). */
  readonly grossLoss: number;
  /**
   * Profit factor = grossProfit / grossLoss.
   * Values > 1 indicate positive expectancy. 0 when not computable.
   */
  readonly profitFactor: number;
}

/**
 * Calculate gross profit, gross loss and profit factor from normalized trades.
 * Does not apply any thresholds or eligibility rules.
 */
export const calculateProfitFactorMetrics = (
  trades: readonly TradeLike[]
): ProfitFactorMetrics => {
  const closed = filterClosedTrades(trades);

  const grossProfit = sumBy(closed, (trade) => {
    const p = trade.profit ?? 0;
    return p > 0 ? p : 0;
  });

  const grossLoss = sumBy(closed, (trade) => {
    const p = trade.profit ?? 0;
    return p < 0 ? Math.abs(p) : 0;
  });

  let profitFactor = 0;
  if (isFiniteNumber(grossLoss) && grossLoss > 0) {
    profitFactor = grossProfit / grossLoss;
  } else if (grossProfit > 0 && grossLoss === 0) {
    // All wins, no losses – treat as very high but finite PF.
    profitFactor = grossProfit;
  }

  if (!isFiniteNumber(profitFactor) || profitFactor < 0) {
    profitFactor = 0;
  }

  return {
    grossProfit,
    grossLoss,
    profitFactor,
  };
};

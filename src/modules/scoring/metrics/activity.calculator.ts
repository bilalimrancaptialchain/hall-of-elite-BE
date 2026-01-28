import { TradeLike } from "./trade.types";
import { countDistinctTradingDays, filterClosedTrades } from "./trade.utils";

export interface ActivityMetricsResult {
  /** Total number of closed trades in the evaluation window. */
  readonly totalTrades: number;
  /** Distinct trading days with at least one closed trade. */
  readonly tradingDays: number;
  /** Average trades per active trading day. */
  readonly avgTradesPerDay: number;
}

/**
 * Calculate basic activity metrics from normalized trades.
 */
export const calculateActivityMetrics = (
  trades: readonly TradeLike[]
): ActivityMetricsResult => {
  const closed = filterClosedTrades(trades);
  const totalTrades = closed.length;
  const tradingDays = countDistinctTradingDays(closed);

  const avgTradesPerDay =
    tradingDays === 0 ? 0 : totalTrades / Math.max(tradingDays, 1);

  return {
    totalTrades,
    tradingDays,
    avgTradesPerDay: Number.isFinite(avgTradesPerDay) && avgTradesPerDay >= 0 ? avgTradesPerDay : 0,
  };
};

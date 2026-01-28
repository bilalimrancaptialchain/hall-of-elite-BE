import { TradeLike } from "./trade.types";
import { filterClosedTrades, isFiniteNumber } from "./trade.utils";

export interface DrawdownMetrics {
  /** Current peak-to-valley drawdown in percentage points (0–100). */
  readonly currentDrawdownPct: number;
  /** Maximum peak-to-valley drawdown observed in the period (0–100). */
  readonly maxDrawdownPct: number;
}

/**
 * Calculate drawdown metrics from a sequence of trades.
 * Uses cumulative net PnL (profit - fees) to build an equity curve.
 */
export const calculateDrawdownMetrics = (
  trades: readonly TradeLike[]
): DrawdownMetrics => {
  const closed = filterClosedTrades(trades);

  let equity = 0;
  let peak = 0;
  let trough = 0;
  let maxDrawdown = 0;

  for (const trade of closed) {
    const profit = isFiniteNumber(trade.profit) ? (trade.profit as number) : 0;
    const fees = isFiniteNumber(trade.fees) ? (trade.fees as number) : 0;
    const net = profit - fees;

    equity += net;

    if (equity > peak) {
      peak = equity;
      trough = equity;
    } else if (equity < trough) {
      trough = equity;
    }

    const drawdown = peak - trough;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  // Convert absolute drawdown to percentage relative to peak equity.
  const currentDrawdownAbs = peak - equity;
  const denominator = peak <= 0 ? 1 : peak;

  const currentDrawdownPct = (currentDrawdownAbs / denominator) * 100;
  const maxDrawdownPct = (maxDrawdown / denominator) * 100;

  const safeCurrent =
    Number.isFinite(currentDrawdownPct) && currentDrawdownPct >= 0
      ? currentDrawdownPct
      : 0;
  const safeMax =
    Number.isFinite(maxDrawdownPct) && maxDrawdownPct >= 0 ? maxDrawdownPct : 0;

  return {
    currentDrawdownPct: safeCurrent,
    maxDrawdownPct: safeMax,
  };
};

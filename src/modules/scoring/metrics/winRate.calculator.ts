import { TradeLike } from "./trade.types";
import { filterClosedTrades, isFiniteNumber } from "./trade.utils";

export interface WinRateMetrics {
  /** Total number of closed trades considered. */
  readonly totalTrades: number;
  /** Number of winning trades (profit > 0). */
  readonly winningTrades: number;
  /** Number of losing trades (profit < 0). */
  readonly losingTrades: number;
  /**
   * Win rate in percentage points (0–100).
   * Breakeven trades (profit === 0) are ignored.
   */
  readonly winRatePct: number;
}

/**
 * Calculate win/loss counts and win rate from normalized trades.
 * Breakeven trades (profit exactly 0) are excluded from the ratio.
 */
export const calculateWinRateMetrics = (
  trades: readonly TradeLike[]
): WinRateMetrics => {
  const closed = filterClosedTrades(trades);

  let winningTrades = 0;
  let losingTrades = 0;
  let consideredTrades = 0;

  for (const trade of closed) {
    const p = trade.profit ?? 0;
    if (!isFiniteNumber(p)) continue;

    if (p > 0) {
      winningTrades += 1;
      consideredTrades += 1;
    } else if (p < 0) {
      losingTrades += 1;
      consideredTrades += 1;
    }
    // profit === 0 is treated as breakeven and ignored
  }

  const winRatePct =
    consideredTrades === 0 ? 0 : (winningTrades / consideredTrades) * 100;

  return {
    totalTrades: closed.length,
    winningTrades,
    losingTrades,
    winRatePct: Number.isFinite(winRatePct) && winRatePct >= 0 ? winRatePct : 0,
  };
};

import { TradeLike } from "./trade.types";
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
export declare const calculateWinRateMetrics: (trades: readonly TradeLike[]) => WinRateMetrics;
//# sourceMappingURL=winRate.calculator.d.ts.map
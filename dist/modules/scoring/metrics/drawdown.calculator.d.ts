import { TradeLike } from "./trade.types";
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
export declare const calculateDrawdownMetrics: (trades: readonly TradeLike[]) => DrawdownMetrics;
//# sourceMappingURL=drawdown.calculator.d.ts.map
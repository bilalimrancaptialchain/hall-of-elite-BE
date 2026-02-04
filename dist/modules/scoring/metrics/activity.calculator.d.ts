import { TradeLike } from "./trade.types";
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
export declare const calculateActivityMetrics: (trades: readonly TradeLike[]) => ActivityMetricsResult;
//# sourceMappingURL=activity.calculator.d.ts.map
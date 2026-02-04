import { TradeLike } from "./trade.types";
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
export declare const calculateProfitFactorMetrics: (trades: readonly TradeLike[]) => ProfitFactorMetrics;
//# sourceMappingURL=profitFactor.calculator.d.ts.map
import { TradeLike } from "./trade.types";
import { TraderMetrics } from "./metrics.types";
export interface DeriveTraderMetricsOptions {
    /** Optional start time boundary for the evaluation window. */
    readonly periodStart?: Date;
    /** Optional end time boundary for the evaluation window. */
    readonly periodEnd?: Date;
}
/**
 * Aggregate individual metric calculators into a single TraderMetrics object.
 * Pure, deterministic, and independent of eligibility, scoring, and persistence.
 */
export declare const deriveTraderMetrics: (trades: readonly TradeLike[], options?: DeriveTraderMetricsOptions) => TraderMetrics;
//# sourceMappingURL=deriveTraderMetrics.d.ts.map
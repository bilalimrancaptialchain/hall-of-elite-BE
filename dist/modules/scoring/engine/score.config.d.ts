/**
 * Configuration for metric normalization ranges and score caps.
 * All numbers are declarative; no logic is performed here.
 */
export declare const SCORE_CONFIG: {
    /** Per-factor weights, expressed as percentages and expected to sum to 100. */
    readonly weights: {
        readonly profitFactor: number;
        readonly drawdown: number;
        readonly winRate: number;
        readonly activity: number;
    };
    /** Normalization ranges for converting raw metrics to 0–100 factor scores. */
    readonly ranges: {
        readonly profitFactor: {
            /** Profit factor below this is treated as 0. */
            readonly min: 1;
            /** Profit factor at or above this is treated as 100 (soft cap). */
            readonly max: 3;
        };
        readonly winRatePct: {
            /** Win rate at or below this is 0. */
            readonly min: 40;
            /** Win rate at or above this is 100. */
            readonly max: 80;
        };
        readonly drawdownPct: {
            /** Best-case drawdown (0% = no drawdown). */
            readonly min: 0;
            /** Worst-case drawdown for scaling penalties. */
            readonly max: 60;
        };
        readonly tradingDays: {
            /** Minimum days of activity needed to start scoring. */
            readonly min: 30;
            /** Days of activity at or above this saturate the activity component. */
            readonly max: 365;
        };
        readonly totalTrades: {
            /** Minimum trades for stable activity scoring. */
            readonly min: 20;
            /** Trades at or above this saturate the activity component. */
            readonly max: 2000;
        };
    };
    /** Global scoring caps. */
    readonly caps: {
        /** Overall score is always clamped to this range. */
        readonly minTotalScore: 0;
        readonly maxTotalScore: 100;
    };
};
export type ScoreConfig = typeof SCORE_CONFIG;
//# sourceMappingURL=score.config.d.ts.map
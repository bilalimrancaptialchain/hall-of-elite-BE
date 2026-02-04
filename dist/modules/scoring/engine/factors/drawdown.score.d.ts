import { ScoreFactorResult, ScoringMetrics } from "../score.types";
/**
 * Drawdown scoring.
 *
 * - Lower drawdown is better.
 * - Uses an inverse, non-linear penalty to hit high drawdown harder.
 */
export declare const scoreDrawdown: (metrics: ScoringMetrics) => ScoreFactorResult;
//# sourceMappingURL=drawdown.score.d.ts.map
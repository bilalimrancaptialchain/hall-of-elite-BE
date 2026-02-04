import { ScoreFactorResult, ScoringMetrics } from "../score.types";
/**
 * Activity scoring.
 *
 * - Rewards sustained participation (trading days and total trades).
 * - Penalises extremely spiky activity by looking at trades-per-day.
 */
export declare const scoreActivity: (metrics: ScoringMetrics) => ScoreFactorResult;
//# sourceMappingURL=activity.score.d.ts.map
import { ScoreFactorResult, ScoringMetrics } from "../score.types";
/**
 * Win rate scoring.
 *
 * - Win rate <= min -> 0
 * - Win rate >= max -> 100
 * - Smooth linear scaling in between.
 * - Extremely high win rates are handled at the eligibility layer, not here.
 */
export declare const scoreWinRate: (metrics: ScoringMetrics) => ScoreFactorResult;
//# sourceMappingURL=winRate.score.d.ts.map
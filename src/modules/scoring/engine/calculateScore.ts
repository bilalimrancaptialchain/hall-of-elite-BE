import { SCORE_CONFIG } from "./score.config";
import { clamp, roundTo } from "./score.utils";
import { ScoreBreakdown, ScoreFactorKey, ScoreResult, ScoringMetrics } from "./score.types";
import { scoreProfitFactor } from "./factors/profitFactor.score";
import { scoreWinRate } from "./factors/winRate.score";
import { scoreDrawdown } from "./factors/drawdown.score";
import { scoreActivity } from "./factors/activity.score";

const FACTOR_ORDER: readonly ScoreFactorKey[] = [
  "profitFactor",
  "winRate",
  "drawdown",
  "activity",
] as const;

/**
 * Calculate a weighted consistency score from normalized metrics.
 * Assumes the trader has already passed validation and eligibility.
 */
export const calculateScore = (metrics: ScoringMetrics): ScoreResult => {
  const breakdown: Partial<ScoreBreakdown> = {};

  const profitFactorResult = scoreProfitFactor(metrics);
  breakdown.profitFactor = profitFactorResult;

  const winRateResult = scoreWinRate(metrics);
  breakdown.winRate = winRateResult;

  const drawdownResult = scoreDrawdown(metrics);
  breakdown.drawdown = drawdownResult;

  const activityResult = scoreActivity(metrics);
  breakdown.activity = activityResult;

  const weights = SCORE_CONFIG.weights;
  const totalWeight =
    weights.profitFactor + weights.drawdown + weights.winRate + weights.activity;

  const normalizedWeights = {
    profitFactor: weights.profitFactor / totalWeight,
    drawdown: weights.drawdown / totalWeight,
    winRate: weights.winRate / totalWeight,
    activity: weights.activity / totalWeight,
  } as const;

  let total = 0;
  total += profitFactorResult.score * normalizedWeights.profitFactor;
  total += winRateResult.score * normalizedWeights.winRate;
  total += drawdownResult.score * normalizedWeights.drawdown;
  total += activityResult.score * normalizedWeights.activity;

  const clampedTotal = clamp(
    roundTo(total, 2),
    SCORE_CONFIG.caps.minTotalScore,
    SCORE_CONFIG.caps.maxTotalScore
  );

  return {
    totalScore: clampedTotal,
    breakdown: breakdown as ScoreBreakdown,
  };
};

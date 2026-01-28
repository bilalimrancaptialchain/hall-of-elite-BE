import { TradeLike } from "./trade.types";
import { TraderMetrics } from "./metrics.types";
import { calculateProfitFactorMetrics } from "./profitFactor.calculator";
import { calculateWinRateMetrics } from "./winRate.calculator";
import { calculateDrawdownMetrics } from "./drawdown.calculator";
import { calculateActivityMetrics } from "./activity.calculator";

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
export const deriveTraderMetrics = (
  trades: readonly TradeLike[],
  options: DeriveTraderMetricsOptions = {}
): TraderMetrics => {
  const profitFactor = calculateProfitFactorMetrics(trades);
  const winRate = calculateWinRateMetrics(trades);
  const drawdown = calculateDrawdownMetrics(trades);
  const activity = calculateActivityMetrics(trades);

  return {
    activity: {
      totalTrades: activity.totalTrades,
      winningTrades: winRate.winningTrades,
      losingTrades: winRate.losingTrades,
      tradingDays: activity.tradingDays,
      avgTradesPerDay: activity.avgTradesPerDay,
    },
    performance: {
      profitFactor: profitFactor.profitFactor,
      winRatePct: winRate.winRatePct,
      totalProfit: profitFactor.grossProfit,
      totalLoss: profitFactor.grossLoss,
      averageWin:
        winRate.winningTrades > 0
          ? profitFactor.grossProfit / winRate.winningTrades
          : 0,
      averageLoss:
        winRate.losingTrades > 0
          ? profitFactor.grossLoss / winRate.losingTrades
          : 0,
      largestWin: 0,
      largestLoss: 0,
      sharpeRatio: 0,
    },
    risk: {
      currentDrawdownPct: drawdown.currentDrawdownPct,
      maxDrawdownPct: drawdown.maxDrawdownPct,
    },
    periodStart: options.periodStart,
    periodEnd: options.periodEnd,
  };
};

/**
 * Activity-related metrics derived from trading history.
 * All percentage values are expressed as 0–100 (not 0–1).
 */
export interface ActivityMetrics {
  /** Total number of closed trades in the evaluation window. */
  readonly totalTrades: number;
  /** Number of winning trades (profit > 0). */
  readonly winningTrades: number;
  /** Number of losing trades (profit < 0). */
  readonly losingTrades: number;
  /** Distinct trading days with at least one closed trade. */
  readonly tradingDays: number;
  /** Average number of trades per active trading day. */
  readonly avgTradesPerDay: number;
}

/**
 * Performance-related metrics that capture return quality.
 * Percentages are 0–100; ratios are unbounded but typically small.
 */
export interface PerformanceMetrics {
  /**
   * Profit factor = gross profit / gross loss.
   * Values > 1 indicate positive expectancy.
   */
  readonly profitFactor: number;
  /** Win rate in percentage points (0–100). */
  readonly winRatePct: number;
  /** Total realized profit across all winning trades (account currency). */
  readonly totalProfit: number;
  /** Total realized loss across all losing trades (absolute value, account currency). */
  readonly totalLoss: number;
  /** Average profit per winning trade. */
  readonly averageWin: number;
  /** Average loss per losing trade (absolute value). */
  readonly averageLoss: number;
  /** Largest single winning trade (account currency). */
  readonly largestWin: number;
  /** Largest single losing trade (absolute value, account currency). */
  readonly largestLoss: number;
  /**
   * Risk-adjusted return metric (e.g. Sharpe ratio).
   * Dimensionless; higher is better.
   */
  readonly sharpeRatio: number;
}

/**
 * Risk-related metrics capturing downside behaviour.
 * Percentages are 0–100 relative to peak equity.
 */
export interface RiskMetrics {
  /** Current peak-to-valley drawdown in percentage points (0–100). */
  readonly currentDrawdownPct: number;
  /** Maximum peak-to-valley drawdown observed in the period (0–100). */
  readonly maxDrawdownPct: number;
}

/**
 * Aggregated, derived metrics for a trader over a specific evaluation window.
 * All fields are expected to be fully computed and sanitized (no NaN/Infinity).
 */
export interface TraderMetrics {
  readonly activity: ActivityMetrics;
  readonly performance: PerformanceMetrics;
  readonly risk: RiskMetrics;
  /** Optional ISO date representing the start of the evaluation window. */
  readonly periodStart?: Date;
  /** Optional ISO date representing the end of the evaluation window. */
  readonly periodEnd?: Date;
}

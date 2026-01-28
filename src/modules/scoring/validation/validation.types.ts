/**
 * High-level area a validation error refers to.
 */
export type ValidationDomain = "TRADER" | "TRADES" | "METRICS";

/**
 * Canonical validation error codes.
 * These are internal-only and never exposed directly to the frontend.
 */
export enum ValidationErrorCode {
  // Trader-level
  TRADER_MISSING_ID = "TRADER_MISSING_ID",
  TRADER_INACTIVE = "TRADER_INACTIVE",
  TRADER_MISSING_METADATA = "TRADER_MISSING_METADATA",

  // Trades-level
  TRADES_MISSING = "TRADES_MISSING",
  TRADES_EMPTY = "TRADES_EMPTY",
  TRADE_INVALID_TIMESTAMP = "TRADE_INVALID_TIMESTAMP",
  TRADE_INVALID_NUMERIC = "TRADE_INVALID_NUMERIC",
  TRADE_INVALID_SYMBOL = "TRADE_INVALID_SYMBOL",
  TRADE_INVALID_VOLUME = "TRADE_INVALID_VOLUME",

  // Metrics-level
  METRICS_INVALID_NUMERIC = "METRICS_INVALID_NUMERIC",
  METRICS_INVALID_DRAWDOWN = "METRICS_INVALID_DRAWDOWN",
  METRICS_INVALID_COUNTS = "METRICS_INVALID_COUNTS",
}

/**
 * Additional context attached to a validation error
 * to make logs debuggable and auditable.
 */
export interface ValidationContext {
  readonly domain: ValidationDomain;
  readonly traderId?: string;
  readonly accountId?: string;
  readonly tradeId?: string | number;
  readonly field?: string;
  readonly index?: number;
}

/**
 * A single validation issue discovered during checks.
 */
export interface ValidationError {
  readonly code: ValidationErrorCode;
  readonly message: string;
  readonly context?: ValidationContext;
}

/**
 * Canonical validation result returned by all validators.
 * Validation MUST NOT throw – it always returns a result.
 */
export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: ValidationError[];
}

/**
 * Minimal trader-level shape required by validation utilities.
 * Extra fields are allowed and ignored.
 */
export interface TraderValidationInput {
  id?: string | null;
  status?: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Minimal trade-level shape required by validation utilities.
 * Timestamps may be Date instances or ISO strings.
 */
export interface TradeValidationInput {
  id?: string | number | null;
  symbol?: string | null;
  volume?: number | null;
  openTime?: Date | string | null;
  closeTime?: Date | string | null;
  profit?: number | null;
  fees?: number | null;
}

/**
 * Minimal metrics shape required by validation utilities.
 * All fields are optional; only present fields are validated.
 */
export interface MetricsValidationInput {
  profitFactor?: number | null;
  winRatePct?: number | null;
  drawdownPct?: number | null;
  totalTrades?: number | null;
  totalTradingDays?: number | null;
  grossProfit?: number | null;
  grossLoss?: number | null;
}

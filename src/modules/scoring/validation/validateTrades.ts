import {
  MetricsValidationInput,
  TradeValidationInput,
  ValidationDomain,
  ValidationError,
  ValidationErrorCode,
  ValidationResult,
} from "./validation.types";

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const parseTimestamp = (value: Date | string | null | undefined): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const baseContext = (
  overrides: Partial<Parameters<typeof buildError>[2]>["context"]
): Parameters<typeof buildError>[2] => ({
  domain: "TRADES" as ValidationDomain,
  ...overrides,
});

const buildError = (
  code: ValidationErrorCode,
  message: string,
  context?: Parameters<typeof baseContext>[0]
): ValidationError => ({
  code,
  message,
  context: context ? baseContext(context) : baseContext({}),
});

/**
 * Validate a collection of closed trades for structural and numeric safety.
 * Does NOT compute any metrics; only validates the raw data.
 */
export const validateTrades = (
  trades: TradeValidationInput[] | null | undefined,
  context?: { traderId?: string; accountId?: string }
): ValidationResult => {
  const errors: ValidationError[] = [];

  try {
    if (!trades) {
      errors.push(
        buildError(ValidationErrorCode.TRADES_MISSING, "Trades collection is missing", {
          traderId: context?.traderId,
          accountId: context?.accountId,
        })
      );

      return { valid: false, errors };
    }

    if (!Array.isArray(trades) || trades.length === 0) {
      errors.push(
        buildError(ValidationErrorCode.TRADES_EMPTY, "No closed trades provided", {
          traderId: context?.traderId,
          accountId: context?.accountId,
        })
      );

      return { valid: false, errors };
    }

    trades.forEach((trade, index) => {
      const tradeId = trade.id ?? index;

      // Symbol
      if (!isNonEmptyString(trade.symbol)) {
        errors.push(
          buildError(
            ValidationErrorCode.TRADE_INVALID_SYMBOL,
            "Trade symbol is missing or empty",
            {
              traderId: context?.traderId,
              accountId: context?.accountId,
              tradeId,
              field: "symbol",
              index,
            }
          )
        );
      }

      // Volume
      if (!isFiniteNumber(trade.volume) || (trade.volume as number) <= 0) {
        errors.push(
          buildError(
            ValidationErrorCode.TRADE_INVALID_VOLUME,
            "Trade volume must be a positive, finite number",
            {
              traderId: context?.traderId,
              accountId: context?.accountId,
              tradeId,
              field: "volume",
              index,
            }
          )
        );
      }

      // Timestamps
      const openTime = parseTimestamp(trade.openTime ?? null);
      const closeTime = parseTimestamp(trade.closeTime ?? null);

      if (!openTime || !closeTime) {
        errors.push(
          buildError(
            ValidationErrorCode.TRADE_INVALID_TIMESTAMP,
            "Trade must have valid open and close timestamps",
            {
              traderId: context?.traderId,
              accountId: context?.accountId,
              tradeId,
              field: !openTime ? "openTime" : "closeTime",
              index,
            }
          )
        );
      } else if (closeTime < openTime) {
        errors.push(
          buildError(
            ValidationErrorCode.TRADE_INVALID_TIMESTAMP,
            "Trade close time cannot be before open time",
            {
              traderId: context?.traderId,
              accountId: context?.accountId,
              tradeId,
              field: "closeTime",
              index,
            }
          )
        );
      }

      // Profit & fees (sanity only, no aggregation)
      if (
        trade.profit !== null &&
        trade.profit !== undefined &&
        !isFiniteNumber(trade.profit)
      ) {
        errors.push(
          buildError(
            ValidationErrorCode.TRADE_INVALID_NUMERIC,
            "Trade profit must be a finite number when present",
            {
              traderId: context?.traderId,
              accountId: context?.accountId,
              tradeId,
              field: "profit",
              index,
            }
          )
        );
      }

      if (trade.fees !== null && trade.fees !== undefined && !isFiniteNumber(trade.fees)) {
        errors.push(
          buildError(
            ValidationErrorCode.TRADE_INVALID_NUMERIC,
            "Trade fees must be a finite number when present",
            {
              traderId: context?.traderId,
              accountId: context?.accountId,
              tradeId,
              field: "fees",
              index,
            }
          )
        );
      }
    });
  } catch {
    // Defensive: any unexpected issue becomes a generic invalid-numeric error
    errors.push(
      buildError(
        ValidationErrorCode.TRADES_MISSING,
        "Unexpected error while validating trades",
        {
          traderId: context?.traderId,
          accountId: context?.accountId,
        }
      )
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

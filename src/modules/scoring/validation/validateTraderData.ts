import {
  MetricsValidationInput,
  TradeValidationInput,
  TraderValidationInput,
  ValidationDomain,
  ValidationError,
  ValidationErrorCode,
  ValidationResult,
} from "./validation.types";
import { validateTrades } from "./validateTrades";
import { validateMetrics } from "./validateMetrics";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const baseContext = (
  overrides: Partial<Parameters<typeof buildError>[2]>["context"]
): Parameters<typeof buildError>[2] => ({
  domain: "TRADER" as ValidationDomain,
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
 * Validate basic trader-level fields (ID, status, metadata).
 * Does NOT touch trades or metrics.
 */
export const validateTraderCore = (
  trader: TraderValidationInput | null | undefined
): ValidationResult => {
  const errors: ValidationError[] = [];

  try {
    if (!trader) {
      errors.push(
        buildError(ValidationErrorCode.TRADER_MISSING_ID, "Trader record is missing", {})
      );
      return { valid: false, errors };
    }

    const traderId = trader.id ?? undefined;

    if (!isNonEmptyString(trader.id)) {
      errors.push(
        buildError(ValidationErrorCode.TRADER_MISSING_ID, "Trader ID is missing or empty", {
          traderId,
          field: "id",
        })
      );
    }

    const status = (trader.status ?? "").toString().toUpperCase();
    if (status && status !== "ACTIVE") {
      errors.push(
        buildError(ValidationErrorCode.TRADER_INACTIVE, "Trader is not active", {
          traderId,
          field: "status",
        })
      );
    }

    if (trader.metadata === null || trader.metadata === undefined) {
      errors.push(
        buildError(
          ValidationErrorCode.TRADER_MISSING_METADATA,
          "Trader metadata is missing",
          { traderId, field: "metadata" }
        )
      );
    }
  } catch {
    errors.push(
      buildError(
        ValidationErrorCode.TRADER_MISSING_ID,
        "Unexpected error while validating trader core data",
        {}
      )
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Aggregated validator that combines trader, trades and metrics validation.
 * Collects all errors and NEVER throws.
 */
export const validateTraderData = (
  trader: TraderValidationInput | null | undefined,
  trades: TradeValidationInput[] | null | undefined,
  metrics: MetricsValidationInput | null | undefined
): ValidationResult => {
  const allErrors: ValidationError[] = [];

  try {
    const coreResult = validateTraderCore(trader);
    allErrors.push(...coreResult.errors);

    const traderId = trader?.id ?? undefined;

    const tradesResult = validateTrades(trades, { traderId });
    allErrors.push(...tradesResult.errors);

    const metricsResult = validateMetrics(metrics, { traderId });
    allErrors.push(...metricsResult.errors);
  } catch {
    allErrors.push(
      buildError(
        ValidationErrorCode.TRADER_MISSING_ID,
        "Unexpected error while validating trader data",
        { traderId: trader?.id ?? undefined }
      )
    );
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
};

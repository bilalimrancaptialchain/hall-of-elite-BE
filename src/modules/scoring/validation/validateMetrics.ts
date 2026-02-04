import {
  MetricsValidationInput,
  ValidationDomain,
  ValidationError,
  ValidationErrorCode,
  ValidationResult,
} from "./validation.types";

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const baseContext = (
  overrides?: Partial<{ traderId?: string; field?: string; index?: number }>
): any => ({
  domain: "METRICS" as ValidationDomain,
  ...overrides,
});

const buildError = (
  code: ValidationErrorCode,
  message: string,
  context?: any
): ValidationError => ({
  code,
  message,
  context: context ? baseContext(context) : baseContext({}),
});

/**
 * Validate precomputed trader metrics for structural and numeric safety.
 * No scoring or eligibility logic is performed here.
 */
export const validateMetrics = (
  metrics: MetricsValidationInput | null | undefined,
  context?: { traderId?: string }
): ValidationResult => {
  const errors: ValidationError[] = [];

  try {
    if (!metrics) {
      // Metrics are optional; absence is not considered invalid here.
      return { valid: true, errors };
    }

    const {
      profitFactor,
      winRatePct,
      drawdownPct,
      totalTrades,
      totalTradingDays,
      grossProfit,
      grossLoss,
    } = metrics;

    const traderId = context?.traderId;

    const checkNumeric = (value: unknown, field: string) => {
      if (value === null || value === undefined) return;
      if (!isFiniteNumber(value)) {
        errors.push(
          buildError(
            ValidationErrorCode.METRICS_INVALID_NUMERIC,
            `Metric ${field} must be a finite number`,
            { traderId, field }
          )
        );
      }
    };

    checkNumeric(profitFactor, "profitFactor");
    checkNumeric(winRatePct, "winRatePct");
    checkNumeric(drawdownPct, "drawdownPct");
    checkNumeric(totalTrades, "totalTrades");
    checkNumeric(totalTradingDays, "totalTradingDays");
    checkNumeric(grossProfit, "grossProfit");
    checkNumeric(grossLoss, "grossLoss");

    // Bounds & sanity checks
    if (isFiniteNumber(drawdownPct) && (drawdownPct < 0 || drawdownPct > 100)) {
      errors.push(
        buildError(
          ValidationErrorCode.METRICS_INVALID_DRAWDOWN,
          "Drawdown percentage must be between 0 and 100",
          { traderId, field: "drawdownPct" }
        )
      );
    }

    if (isFiniteNumber(winRatePct) && (winRatePct < 0 || winRatePct > 100)) {
      errors.push(
        buildError(
          ValidationErrorCode.METRICS_INVALID_NUMERIC,
          "Win rate percentage must be between 0 and 100",
          { traderId, field: "winRatePct" }
        )
      );
    }

    if (isFiniteNumber(totalTrades) && totalTrades < 0) {
      errors.push(
        buildError(
          ValidationErrorCode.METRICS_INVALID_COUNTS,
          "Total trades cannot be negative",
          { traderId, field: "totalTrades" }
        )
      );
    }

    if (isFiniteNumber(totalTradingDays) && totalTradingDays < 0) {
      errors.push(
        buildError(
          ValidationErrorCode.METRICS_INVALID_COUNTS,
          "Total trading days cannot be negative",
          { traderId, field: "totalTradingDays" }
        )
      );
    }

    if (
      isFiniteNumber(grossProfit) &&
      isFiniteNumber(grossLoss) &&
      grossProfit <= 0 &&
      grossLoss <= 0
    ) {
      errors.push(
        buildError(
          ValidationErrorCode.METRICS_INVALID_NUMERIC,
          "Gross profit and gross loss cannot both be non-positive",
          { traderId }
        )
      );
    }
  } catch {
    errors.push(
      buildError(
        ValidationErrorCode.METRICS_INVALID_NUMERIC,
        "Unexpected error while validating metrics",
        { traderId: context?.traderId }
      )
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

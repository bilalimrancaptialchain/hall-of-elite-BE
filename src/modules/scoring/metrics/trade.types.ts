/**
 * Minimal trade shape used by metric and scoring utilities.
 * Timestamps may be Date instances or ISO strings.
 */
export interface TradeLike {
  readonly id?: string | number;
  readonly openTime: Date | string;
  readonly closeTime?: Date | string | null;
  readonly profit?: number | null;
  readonly fees?: number | null;
}

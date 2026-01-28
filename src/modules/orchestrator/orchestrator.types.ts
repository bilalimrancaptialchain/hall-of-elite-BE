import { TradeLike } from "../scoring/metrics";
import { TraderMetrics } from "../scoring/metrics";
import { TierLevel } from "../scoring/tiers";

export interface PipelineTraderInput {
  readonly traderId: string;
  readonly externalTraderId: string;
  /** Normalized MT5 trades for this trader. */
  readonly trades: readonly TradeLike[];
}

export interface PipelineInput {
  /** Stable, idempotent key for this scoring run (e.g. date range hash). */
  readonly runKey: string;
  /** Traders to be processed in this run. */
  readonly traders: readonly PipelineTraderInput[];
  /** Optional label for observability (e.g. "daily-2026-01-28"). */
  readonly label?: string;
  /** Optional completion timestamp from upstream ingestion. */
  readonly generatedAt?: Date;
}

export interface OrchestratorOptions {
  /** Maximum retry attempts per trader for transient errors. */
  readonly maxAttemptsPerTrader?: number;
  /** Optional batch size for processing traders in chunks. */
  readonly batchSize?: number;
}

export type TraderPipelineStatus = "success" | "ineligible" | "invalid" | "failed";

export interface ProcessedTrader {
  readonly traderId: string;
  readonly externalTraderId: string;
  readonly status: TraderPipelineStatus;
  readonly score: number | null;
  readonly tier: TierLevel | null;
  readonly rank: number | null;
  readonly metrics: TraderMetrics | null;
  /** Optional machine-readable eligibility failure codes. */
  readonly eligibilityReasons?: string[];
  /** Optional validation or processing error messages. */
  readonly errors?: string[];
}

export interface PipelineSummary {
  readonly total: number;
  readonly processed: number;
  readonly successful: number;
  readonly ineligible: number;
  readonly invalid: number;
  readonly failed: number;
}

export interface PipelineOutput {
  readonly runKey: string;
  readonly snapshotId: string | null;
  readonly summary: PipelineSummary;
  readonly traders: ProcessedTrader[];
}

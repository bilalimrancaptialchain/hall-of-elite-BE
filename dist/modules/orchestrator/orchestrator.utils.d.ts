/**
 * Generic retry helper for async operations.
 * Retries on any thrown error up to maxAttempts times.
 */
export declare const withRetry: <T>(operation: () => Promise<T>, maxAttempts: number) => Promise<T>;
/**
 * Split an array into batches of at most batchSize elements.
 */
export declare const splitIntoBatches: <T>(items: readonly T[], batchSize: number) => T[][];
//# sourceMappingURL=orchestrator.utils.d.ts.map
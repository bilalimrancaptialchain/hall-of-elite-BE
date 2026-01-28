/**
 * Generic retry helper for async operations.
 * Retries on any thrown error up to maxAttempts times.
 */
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxAttempts: number
): Promise<T> => {
  let attempt = 0;
  let lastError: unknown;

  while (attempt < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      attempt += 1;
      if (attempt >= maxAttempts) {
        throw lastError;
      }
    }
  }

  // Should be unreachable, but keeps TypeScript happy.
  throw lastError;
};

/**
 * Split an array into batches of at most batchSize elements.
 */
export const splitIntoBatches = <T>(items: readonly T[], batchSize: number): T[][] => {
  if (batchSize <= 0 || !Number.isFinite(batchSize)) {
    return [items.slice()];
  }

  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }
  return batches;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitIntoBatches = exports.withRetry = void 0;
/**
 * Generic retry helper for async operations.
 * Retries on any thrown error up to maxAttempts times.
 */
const withRetry = async (operation, maxAttempts) => {
    let attempt = 0;
    let lastError;
    while (attempt < maxAttempts) {
        try {
            return await operation();
        }
        catch (error) {
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
exports.withRetry = withRetry;
/**
 * Split an array into batches of at most batchSize elements.
 */
const splitIntoBatches = (items, batchSize) => {
    if (batchSize <= 0 || !Number.isFinite(batchSize)) {
        return [items.slice()];
    }
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
        batches.push(items.slice(i, i + batchSize));
    }
    return batches;
};
exports.splitIntoBatches = splitIntoBatches;
//# sourceMappingURL=orchestrator.utils.js.map
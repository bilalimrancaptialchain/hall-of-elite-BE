import { ScoredTraderInput } from "./ranking.types";
/**
 * Stable sort implementation that preserves input order for equal keys.
 */
export declare const stableSort: <T>(items: readonly T[], compare: (a: T, b: T) => number) => T[];
/**
 * Default tie-breaking strategy for scored traders:
 * 1) Higher score
 * 2) Higher profit factor (if present)
 * 3) Lower drawdown percentage (if present)
 * 4) Lexicographical traderId
 */
export declare const compareScoredTraders: (a: ScoredTraderInput, b: ScoredTraderInput) => number;
//# sourceMappingURL=ranking.utils.d.ts.map
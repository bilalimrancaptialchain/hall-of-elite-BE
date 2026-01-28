/**
 * Clamp a numeric score into [0, 100].
 */
export const clampScore = (score: number): number => {
  if (!Number.isFinite(score)) {
    return 0;
  }
  if (score < 0) return 0;
  if (score > 100) return 100;
  return score;
};

/**
 * Check if a score falls within a [min, max] band (inclusive on both ends).
 */
export const isScoreInBand = (score: number, minScore: number, maxScore: number): boolean =>
  score >= minScore && score <= maxScore;

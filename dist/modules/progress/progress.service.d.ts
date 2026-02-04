import type { UserProgressResponse } from "./progress.types";
/**
 * Get dashboard progress for the authenticated user: current level (consistency score),
 * next reward threshold, and which targets are unlocked / can be unlocked.
 * When the user has no linked MT5 trader or score, returns default progress (0%, first threshold, targets 1 unlocked at 0).
 */
export declare function getProgressForUser(userId: string): Promise<UserProgressResponse>;
//# sourceMappingURL=progress.service.d.ts.map
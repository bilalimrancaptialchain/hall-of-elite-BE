"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUM_TARGETS = exports.REWARD_TARGET_THRESHOLDS = void 0;
/**
 * Reward target thresholds: required level (0–100) to unlock each target.
 * Target 1 is always unlocked at 0%; subsequent targets unlock at these levels.
 */
exports.REWARD_TARGET_THRESHOLDS = [
    0, // Target 1
    75, // Target 2
    80, // Target 3
    85, // Target 4
    88, // Target 5
    90, // Target 6
    92, // Target 7
    94, // Target 8
    96, // Target 9
    98, // Target 10
];
exports.NUM_TARGETS = exports.REWARD_TARGET_THRESHOLDS.length;
//# sourceMappingURL=progress.config.js.map
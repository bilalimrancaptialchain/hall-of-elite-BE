"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankTraders = void 0;
const ranking_utils_1 = require("./ranking.utils");
/**
 * Rank traders by score (and tie-breakers) in a deterministic way.
 * Input is not mutated.
 */
const rankTraders = (traders) => {
    const sorted = (0, ranking_utils_1.stableSort)(traders, ranking_utils_1.compareScoredTraders);
    return sorted.map((trader, index) => ({
        ...trader,
        rank: index + 1,
    }));
};
exports.rankTraders = rankTraders;
//# sourceMappingURL=rankTraders.js.map
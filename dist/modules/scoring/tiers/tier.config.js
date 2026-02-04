"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIER_CONFIG = void 0;
const tiers_config_1 = require("../config/tiers.config");
/**
 * Centralized tier configuration for the Tier Resolver.
 * Adapted from the core scoring tier definitions to avoid duplication.
 */
exports.TIER_CONFIG = tiers_config_1.TIER_DEFINITIONS.map((def) => ({
    level: def.id,
    label: def.label,
    minScore: def.minScore,
    maxScore: def.maxScore ?? 100,
    order: def.order,
})).sort((a, b) => a.order - b.order);
//# sourceMappingURL=tier.config.js.map
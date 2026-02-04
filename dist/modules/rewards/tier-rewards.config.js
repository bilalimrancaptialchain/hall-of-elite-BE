"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIER_REWARDS_MAP = void 0;
/**
 * Single source of truth for tier → reward eligibility (flags only).
 * Used by RewardsService and AdminService (static fallback).
 * MVP: config file; no fulfillment ops.
 */
const types_1 = require("../../types");
exports.TIER_REWARDS_MAP = {
    [types_1.TraderTier.BRONZE]: {
        phoenixAddOn: false,
        payoutBoost: false,
        cashback: false,
        merchandise: false,
    },
    [types_1.TraderTier.SILVER]: {
        phoenixAddOn: false,
        payoutBoost: false,
        cashback: true,
        merchandise: false,
    },
    [types_1.TraderTier.GOLD]: {
        phoenixAddOn: false,
        payoutBoost: true,
        cashback: true,
        merchandise: false,
    },
    [types_1.TraderTier.PLATINUM]: {
        phoenixAddOn: false,
        payoutBoost: true,
        cashback: true,
        merchandise: true,
    },
    [types_1.TraderTier.DIAMOND]: {
        phoenixAddOn: true,
        payoutBoost: true,
        cashback: true,
        merchandise: true,
    },
    [types_1.TraderTier.ELITE]: {
        phoenixAddOn: true,
        payoutBoost: true,
        cashback: true,
        merchandise: true,
    },
};
//# sourceMappingURL=tier-rewards.config.js.map
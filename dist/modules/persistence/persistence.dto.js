"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mt5MetricsSchema = exports.mt5TradeSchema = exports.mt5AccountSchema = exports.mt5TraderSchema = exports.mt5RawUserSchema = void 0;
const zod_1 = require("zod");
exports.mt5RawUserSchema = zod_1.z.object({
    login: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]),
    name: zod_1.z.string(),
    balance: zod_1.z.number(),
    leverage: zod_1.z.number().nullable().optional(),
    currency: zod_1.z.string().nullable().optional(),
    status: zod_1.z.string().nullable().optional(),
    group: zod_1.z.string().optional(),
});
exports.mt5TraderSchema = zod_1.z.object({
    externalId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    accountStatus: zod_1.z.string().min(1),
});
exports.mt5AccountSchema = zod_1.z.object({
    externalId: zod_1.z.string().min(1),
    traderExternalId: zod_1.z.string().min(1),
    balance: zod_1.z.number().finite(),
    leverage: zod_1.z.number().int().positive(),
    currency: zod_1.z.string().min(1),
    status: zod_1.z.string().min(1),
});
exports.mt5TradeSchema = zod_1.z.object({
    externalId: zod_1.z.string().min(1),
    accountExternalId: zod_1.z.string().min(1),
    symbol: zod_1.z.string().min(1),
    volume: zod_1.z.number().finite(),
    profitLoss: zod_1.z.number().finite(),
    fees: zod_1.z.number().finite(),
    openTime: zod_1.z.date(),
    closeTime: zod_1.z.date().optional(),
    status: zod_1.z.string().min(1),
});
exports.mt5MetricsSchema = zod_1.z.object({
    traderExternalId: zod_1.z.string().min(1),
    profitFactor: zod_1.z.number().finite(),
    winRate: zod_1.z.number().finite(),
    drawdown: zod_1.z.number().finite(),
    totalTradingDays: zod_1.z.number().int().nonnegative(),
});
//# sourceMappingURL=persistence.dto.js.map
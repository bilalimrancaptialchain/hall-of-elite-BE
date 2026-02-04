"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraderById = exports.getAllTraders = void 0;
const trader_service_1 = require("../services/trader.service");
const types_1 = require("../types");
const elite_read_1 = require("../modules/snapshots/read-models/elite.read");
const traderService = new trader_service_1.TraderService();
const MOCK_TRADERS = [
    { id: "1", userId: "user-1", displayName: "Elite Trader Alpha", tier: types_1.TraderTier.ELITE, rank: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: "2", userId: "user-2", displayName: "Diamond Trader Beta", tier: types_1.TraderTier.DIAMOND, rank: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: "3", userId: "user-3", displayName: "Platinum Trader Gamma", tier: types_1.TraderTier.PLATINUM, rank: 3, createdAt: new Date(), updatedAt: new Date() },
];
const getAllTraders = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 10, 100);
        const tier = req.query.tier;
        let list = [];
        try {
            list = await (0, elite_read_1.getEliteLeaderboardFromLatestSnapshot)(limit * 10);
        }
        catch {
            // Snapshot tables may not exist or DB error; fall back to mock
        }
        if (list.length > 0) {
            const traders = list.map((item, index) => ({
                id: item.traderId,
                userId: item.traderId,
                displayName: item.displayName,
                tier: item.tier,
                rank: item.rank,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            const filtered = tier ? traders.filter((t) => t.tier === tier) : traders;
            const start = (page - 1) * limit;
            const paginated = filtered.slice(start, start + limit);
            return res.json({
                success: true,
                data: paginated,
                pagination: { page, limit, total: filtered.length },
            });
        }
        const filteredTraders = tier ? MOCK_TRADERS.filter((t) => t.tier === tier) : MOCK_TRADERS;
        res.json({
            success: true,
            data: filteredTraders,
            pagination: { page, limit, total: filteredTraders.length },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTraders = getAllTraders;
const getTraderById = async (req, res, next) => {
    try {
        const id = typeof req.params.id === "string" ? req.params.id : req.params.id?.[0] ?? "";
        // Try to get from database
        const profile = await traderService.getTraderProfile(id);
        if (!profile) {
            // Fallback to mock data if database is empty
            const mockProfile = await traderService.getTraderProfileMock(id);
            return res.json({
                success: true,
                data: mockProfile,
            });
        }
        res.json({
            success: true,
            data: profile,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTraderById = getTraderById;
//# sourceMappingURL=trader.controller.js.map
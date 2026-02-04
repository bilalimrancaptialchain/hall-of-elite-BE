"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderService = void 0;
const types_1 = require("../types");
const client_1 = require("../prisma/client");
class TraderService {
    async getAllTraders(filters) {
        // Placeholder - will be implemented with actual database queries
        return [];
    }
    async getTraderById(id) {
        // Placeholder - will be implemented with actual database queries
        return null;
    }
    async getTraderMetrics(traderId) {
        // Placeholder - will be implemented with actual database queries
        return null;
    }
    async getTraderProfile(id) {
        try {
            // Try to fetch from database first
            const traderScore = await client_1.prisma.traderScore.findUnique({
                where: { tradingAccountId: id },
            });
            if (!traderScore) {
                return null;
            }
            // Fetch related data
            const metrics = await client_1.prisma.traderMetrics.findUnique({
                where: { tradingAccountId: id },
            });
            const rewardEntitlements = await client_1.prisma.rewardEntitlement.findMany({
                where: { traderId: id },
            });
            // Calculate account age (days since creation)
            const tradingAccount = await client_1.prisma.tradingAccount.findUnique({
                where: { id },
            });
            const accountAge = tradingAccount
                ? Math.floor((Date.now() - tradingAccount.createdAt.getTime()) / (1000 * 60 * 60 * 24))
                : undefined;
            // Map reward entitlements to reward flags
            const rewards = {
                phoenixAddOn: rewardEntitlements.some((r) => r.rewardType === "BONUS" && r.status === "PENDING"),
                payoutBoost: rewardEntitlements.some((r) => r.rewardType === "BONUS" && r.status === "PENDING"),
                cashback: rewardEntitlements.some((r) => r.rewardType === "CASH" && r.status === "PENDING"),
                merchandise: rewardEntitlements.some((r) => r.rewardType === "MERCHANDISE" && r.status === "PENDING"),
            };
            // Build profile DTO
            if (!metrics) {
                return null;
            }
            return {
                id,
                displayName: `Trader ${id}`, // Should come from user table
                tier: traderScore.tier,
                rank: traderScore.rank,
                accountAge,
                overallScore: traderScore.score,
                metrics: {
                    profitFactor: metrics.profitFactor,
                    winRate: metrics.winRate,
                    maxDrawdown: metrics.maxDrawdown,
                    totalProfit: metrics.totalProfit,
                    totalTrades: metrics.totalTrades,
                    sharpeRatio: metrics.sharpeRatio,
                    averageWin: metrics.averageWin,
                    averageLoss: metrics.averageLoss,
                    largestWin: metrics.largestWin,
                    largestLoss: metrics.largestLoss,
                    currentDrawdown: metrics.currentDrawdown,
                },
                rewards,
            };
        }
        catch (error) {
            console.error("Error fetching trader profile:", error);
            return null;
        }
    }
    async getTraderProfileMock(id) {
        // Mock data for development/testing
        return {
            id,
            displayName: "Elite Trader Alpha",
            tier: types_1.TraderTier.ELITE,
            rank: 1,
            accountAge: 365,
            overallScore: 95.5,
            metrics: {
                profitFactor: 2.78,
                winRate: 70.0,
                maxDrawdown: 12.5,
                totalProfit: 125000,
                totalTrades: 1250,
                tradingDays: 180,
                sharpeRatio: 2.15,
                averageWin: 142.86,
                averageLoss: 120.0,
                largestWin: 5000,
                largestLoss: 2000,
                currentDrawdown: 5.2,
            },
            rewards: {
                phoenixAddOn: true,
                payoutBoost: true,
                cashback: true,
                merchandise: false,
            },
        };
    }
}
exports.TraderService = TraderService;
//# sourceMappingURL=trader.service.js.map
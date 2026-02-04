"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraderRewards = void 0;
const rewards_service_1 = require("./rewards.service");
const rewardsService = new rewards_service_1.RewardsService();
const getTraderRewards = async (req, res, next) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const eligibility = await rewardsService.getRewardEligibility(id);
        if (!eligibility) {
            const mockEligibility = await rewardsService.getRewardEligibilityMock(id);
            return res.json({
                success: true,
                data: mockEligibility,
            });
        }
        res.json({
            success: true,
            data: eligibility,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTraderRewards = getTraderRewards;
//# sourceMappingURL=rewards.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rewards_controller_1 = require("./rewards.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const rewards_validator_1 = require("./rewards.validator");
const router = (0, express_1.Router)();
router.get("/traders/:id", (0, validateRequest_1.validateRequest)({ params: rewards_validator_1.getTraderRewardsParamsSchema }), rewards_controller_1.getTraderRewards);
exports.default = router;
//# sourceMappingURL=rewards.routes.js.map
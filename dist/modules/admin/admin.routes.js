"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const admin_validator_1 = require("./admin.validator");
const router = (0, express_1.Router)();
router.get("/tiers", admin_controller_1.getTierConfigs);
router.get("/tiers/:id", (0, validateRequest_1.validateRequest)({ params: admin_validator_1.getTierConfigByIdParamsSchema }), admin_controller_1.getTierConfigById);
router.get("/rewards", admin_controller_1.getRewardConfigs);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map
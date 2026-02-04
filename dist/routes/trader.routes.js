"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trader_controller_1 = require("../controllers/trader.controller");
const validateRequest_1 = require("../middlewares/validateRequest");
const trader_validator_1 = require("../validators/trader.validator");
const router = (0, express_1.Router)();
router.get("/", (0, validateRequest_1.validateRequest)({ query: trader_validator_1.getTradersQuerySchema }), trader_controller_1.getAllTraders);
router.get("/:id", (0, validateRequest_1.validateRequest)({ params: trader_validator_1.getTraderParamsSchema }), trader_controller_1.getTraderById);
exports.default = router;
//# sourceMappingURL=trader.routes.js.map
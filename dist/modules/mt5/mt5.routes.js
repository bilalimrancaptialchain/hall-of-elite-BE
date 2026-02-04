"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * MT5 routes.
 * Created to wire MT5 HTTP endpoints to controllers and validators.
 */
const express_1 = require("express");
const mt5_controller_1 = require("./mt5.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const mt5_validator_1 = require("./mt5.validator");
const router = (0, express_1.Router)();
router.get("/accounts", mt5_controller_1.getAccounts);
router.get("/trades/:accountId", (0, validateRequest_1.validateRequest)({
    params: mt5_validator_1.getTradesParamsSchema,
    query: mt5_validator_1.getTradesQuerySchema,
}), mt5_controller_1.getTrades);
router.get("/status", mt5_controller_1.getConnectionStatus);
router.post("/connect", mt5_controller_1.connect);
router.post("/disconnect", mt5_controller_1.disconnect);
exports.default = router;
//# sourceMappingURL=mt5.routes.js.map
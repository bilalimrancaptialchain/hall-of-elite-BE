"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scoring_controller_1 = require("./scoring.controller");
const router = (0, express_1.Router)();
router.get("/config", scoring_controller_1.getScoringConfig);
router.post("/run", scoring_controller_1.runScoring);
exports.default = router;
//# sourceMappingURL=scoring.routes.js.map
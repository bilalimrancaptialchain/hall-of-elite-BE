"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScoring = exports.getScoringConfig = void 0;
const scoring_service_1 = require("./scoring.service");
const scoring_config_1 = require("./scoring.config");
const scoringService = new scoring_service_1.ScoringService();
const getScoringConfig = async (_req, res) => {
    res.json({
        success: true,
        data: scoring_config_1.SCORING_RULES,
    });
};
exports.getScoringConfig = getScoringConfig;
const runScoring = async (_req, res) => {
    const result = await scoringService.runScoring();
    res.json({
        success: true,
        data: result,
    });
};
exports.runScoring = runScoring;
//# sourceMappingURL=scoring.controller.js.map
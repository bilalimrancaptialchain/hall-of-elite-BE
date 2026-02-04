"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTierConfigById = exports.getRewardConfigs = exports.getTierConfigs = void 0;
const admin_service_1 = require("./admin.service");
const adminService = new admin_service_1.AdminService();
const getTierConfigs = async (req, res, next) => {
    try {
        const configs = await adminService.getTierConfigs();
        const response = {
            success: true,
            data: configs,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getTierConfigs = getTierConfigs;
const getRewardConfigs = async (req, res, next) => {
    try {
        const configs = await adminService.getRewardConfigs();
        const response = {
            success: true,
            data: configs,
        };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
};
exports.getRewardConfigs = getRewardConfigs;
const getTierConfigById = async (req, res, next) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const config = await adminService.getTierConfigById(id);
        if (!config) {
            return res.status(404).json({
                success: false,
                error: "Tier config not found",
            });
        }
        res.json({
            success: true,
            data: config,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTierConfigById = getTierConfigById;
//# sourceMappingURL=admin.controller.js.map
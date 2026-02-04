"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = exports.getConnectionStatus = exports.getTrades = exports.getAccounts = void 0;
const mt5_service_1 = require("./mt5.service");
const mt5_logger_1 = require("./mt5.logger");
const errorHandler_1 = require("../../middlewares/errorHandler");
const mt5Service = new mt5_service_1.MT5Service();
/**
 * Get all MT5 accounts
 */
const getAccounts = async (req, res, next) => {
    try {
        mt5_logger_1.MT5Logger.info("MT5_CONTROLLER", "GET /mt5/accounts");
        const accounts = await mt5Service.getAccounts();
        res.json({
            success: true,
            data: accounts,
            metadata: {
                timestamp: new Date(),
                operation: "getAccounts",
                count: accounts.length,
            },
        });
    }
    catch (error) {
        mt5_logger_1.MT5Logger.error("MT5_CONTROLLER", "Error in getAccounts", error);
        next(error);
    }
};
exports.getAccounts = getAccounts;
/**
 * Get trades for a specific account
 */
const getTrades = async (req, res, next) => {
    try {
        const { accountId } = req.params;
        const accountIdStr = Array.isArray(accountId) ? accountId[0] : accountId;
        const { startDate, endDate } = req.query;
        mt5_logger_1.MT5Logger.info("MT5_CONTROLLER", `GET /mt5/trades/${accountIdStr}`, {
            accountId: accountIdStr,
            startDate,
            endDate,
        });
        // Parse date parameters if provided
        const startDateStr = Array.isArray(startDate)
            ? startDate[0]
            : typeof startDate === "string"
                ? startDate
                : undefined;
        const endDateStr = Array.isArray(endDate)
            ? endDate[0]
            : typeof endDate === "string"
                ? endDate
                : undefined;
        const startDateParsed = startDateStr
            ? new Date(startDateStr)
            : undefined;
        const endDateParsed = endDateStr ? new Date(endDateStr) : undefined;
        // Validate dates
        if (startDateParsed && isNaN(startDateParsed.getTime())) {
            throw new errorHandler_1.AppError("Invalid startDate format", 400, "INVALID_DATE");
        }
        if (endDateParsed && isNaN(endDateParsed.getTime())) {
            throw new errorHandler_1.AppError("Invalid endDate format", 400, "INVALID_DATE");
        }
        if (startDateParsed &&
            endDateParsed &&
            startDateParsed > endDateParsed) {
            throw new errorHandler_1.AppError("startDate must be before endDate", 400, "INVALID_DATE_RANGE");
        }
        const trades = await mt5Service.getTrades(accountIdStr, startDateParsed, endDateParsed);
        res.json({
            success: true,
            data: trades,
            metadata: {
                timestamp: new Date(),
                operation: "getTrades",
                count: trades.length,
                accountId,
            },
        });
    }
    catch (error) {
        mt5_logger_1.MT5Logger.error("MT5_CONTROLLER", "Error in getTrades", error, {
            accountId: Array.isArray(req.params.accountId) ? req.params.accountId[0] : req.params.accountId,
        });
        next(error);
    }
};
exports.getTrades = getTrades;
/**
 * Get MT5 connection status
 */
const getConnectionStatus = async (req, res, next) => {
    try {
        mt5_logger_1.MT5Logger.info("MT5_CONTROLLER", "GET /mt5/status");
        const status = await mt5Service.getConnectionStatus();
        res.json({
            success: true,
            data: status,
            metadata: {
                timestamp: new Date(),
                operation: "getConnectionStatus",
            },
        });
    }
    catch (error) {
        mt5_logger_1.MT5Logger.error("MT5_CONTROLLER", "Error in getConnectionStatus", error);
        next(error);
    }
};
exports.getConnectionStatus = getConnectionStatus;
/**
 * Connect to MT5
 */
const connect = async (req, res, next) => {
    try {
        mt5_logger_1.MT5Logger.info("MT5_CONTROLLER", "POST /mt5/connect");
        const status = await mt5Service.connect();
        if (!status.connected) {
            throw new errorHandler_1.AppError(status.error || "Failed to connect to MT5", 503, "MT5_CONNECTION_FAILED");
        }
        res.json({
            success: true,
            data: status,
            metadata: {
                timestamp: new Date(),
                operation: "connect",
            },
        });
    }
    catch (error) {
        mt5_logger_1.MT5Logger.error("MT5_CONTROLLER", "Error in connect", error);
        next(error);
    }
};
exports.connect = connect;
/**
 * Disconnect from MT5
 */
const disconnect = async (req, res, next) => {
    try {
        mt5_logger_1.MT5Logger.info("MT5_CONTROLLER", "POST /mt5/disconnect");
        await mt5Service.disconnect();
        res.json({
            success: true,
            data: {
                message: "Disconnected from MT5 successfully",
            },
            metadata: {
                timestamp: new Date(),
                operation: "disconnect",
            },
        });
    }
    catch (error) {
        mt5_logger_1.MT5Logger.error("MT5_CONTROLLER", "Error in disconnect", error);
        next(error);
    }
};
exports.disconnect = disconnect;
//# sourceMappingURL=mt5.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = void 0;
const auth_service_1 = require("./auth.service");
const errorHandler_1 = require("../../middlewares/errorHandler");
const authMiddleware = async (req, res, next) => {
    try {
        // Try to get token from Authorization header
        const authHeader = req.headers.authorization;
        let token;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        else if (req.cookies?.token) {
            // Fallback to cookie
            token = req.cookies.token;
        }
        if (!token) {
            throw new errorHandler_1.AppError("Authentication required", 401);
        }
        // Verify token
        const payload = auth_service_1.authService.verifyToken(token);
        // Attach user to request
        req.user = payload;
        next();
    }
    catch (error) {
        if (error instanceof errorHandler_1.AppError) {
            next(error);
        }
        else {
            next(new errorHandler_1.AppError("Invalid authentication token", 401));
        }
    }
};
exports.authMiddleware = authMiddleware;
const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errorHandler_1.AppError("Authentication required", 401));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new errorHandler_1.AppError("Insufficient permissions", 403));
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=auth.middleware.js.map
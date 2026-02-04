"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = exports.getMe = void 0;
const auth_service_1 = require("./auth.service");
const getMe = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ success: false, error: "Authentication required" });
        return;
    }
    const user = await auth_service_1.authService.getUserById(userId);
    if (!user) {
        res.status(404).json({ success: false, error: "User not found" });
        return;
    }
    res.json({
        success: true,
        data: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
        },
    });
};
exports.getMe = getMe;
const register = async (req, res) => {
    const data = req.body;
    const result = await auth_service_1.authService.register(data);
    res.status(201).json({
        success: true,
        data: result,
    });
};
exports.register = register;
const login = async (req, res) => {
    const data = req.body;
    const result = await auth_service_1.authService.login(data);
    // Set HTTP-only cookie for additional security
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
        success: true,
        data: result,
    });
};
exports.login = login;
const logout = async (req, res) => {
    const result = await auth_service_1.authService.logout();
    // Clear the token cookie
    res.clearCookie("token");
    res.json({
        success: true,
        data: result,
    });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map
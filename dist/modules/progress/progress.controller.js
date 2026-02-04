"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProgress = getUserProgress;
const progress_service_1 = require("./progress.service");
async function getUserProgress(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ success: false, error: "Authentication required" });
            return;
        }
        const progress = await (0, progress_service_1.getProgressForUser)(userId);
        res.json({ success: true, data: progress });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=progress.controller.js.map
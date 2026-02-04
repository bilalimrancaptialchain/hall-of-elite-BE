"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const method = req.method;
        const url = req.url;
        const status = res.statusCode;
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${method} ${url} ${status} - ${duration}ms`);
    });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=logger.js.map
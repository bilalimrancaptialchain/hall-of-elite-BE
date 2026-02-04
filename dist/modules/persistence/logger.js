"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceLogger = void 0;
const toIso = () => new Date().toISOString();
const sanitizeContext = (context) => {
    if (!context) {
        return undefined;
    }
    const sanitized = {};
    for (const [key, value] of Object.entries(context)) {
        if (value === undefined) {
            continue;
        }
        sanitized[key] = value;
    }
    return Object.keys(sanitized).length > 0 ? sanitized : undefined;
};
const log = (level, scope, message, context) => {
    const payload = {
        timestamp: toIso(),
        scope,
        message,
        ...sanitizeContext(context),
    };
    if (level === "error") {
        console.error(payload);
        return;
    }
    if (level === "warn") {
        console.warn(payload);
        return;
    }
    console.log(payload);
};
exports.PersistenceLogger = {
    info: (scope, message, context) => log("info", scope, message, context),
    warn: (scope, message, context) => log("warn", scope, message, context),
    error: (scope, message, error, context) => log("error", scope, message, {
        error: error ? { name: error.name, message: error.message } : undefined,
        ...context,
    }),
};
//# sourceMappingURL=logger.js.map
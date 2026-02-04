"use strict";
/**
 * MT5 module logger.
 * Created to centralize structured logs for MT5 operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MT5Logger = exports.MT5LogLevel = void 0;
var MT5LogLevel;
(function (MT5LogLevel) {
    MT5LogLevel["INFO"] = "INFO";
    MT5LogLevel["WARN"] = "WARN";
    MT5LogLevel["ERROR"] = "ERROR";
    MT5LogLevel["DEBUG"] = "DEBUG";
})(MT5LogLevel || (exports.MT5LogLevel = MT5LogLevel = {}));
class MT5Logger {
    static formatLogEntry(entry) {
        const { timestamp, level, operation, message, metadata, error } = entry;
        const timestampStr = timestamp.toISOString();
        const metadataStr = metadata ? ` | Metadata: ${JSON.stringify(metadata)}` : "";
        const errorStr = error ? ` | Error: ${error.message}${error.stack ? `\n${error.stack}` : ""}` : "";
        return `[${timestampStr}] [MT5:${level}] [${operation}] ${message}${metadataStr}${errorStr}`;
    }
    static info(operation, message, metadata) {
        const entry = {
            timestamp: new Date(),
            level: MT5LogLevel.INFO,
            operation,
            message,
            metadata,
        };
        console.log(this.formatLogEntry(entry));
    }
    static warn(operation, message, metadata) {
        const entry = {
            timestamp: new Date(),
            level: MT5LogLevel.WARN,
            operation,
            message,
            metadata,
        };
        console.warn(this.formatLogEntry(entry));
    }
    static error(operation, message, error, metadata) {
        const entry = {
            timestamp: new Date(),
            level: MT5LogLevel.ERROR,
            operation,
            message,
            error,
            metadata,
        };
        console.error(this.formatLogEntry(entry));
    }
    static debug(operation, message, metadata) {
        if (process.env.NODE_ENV === "development") {
            const entry = {
                timestamp: new Date(),
                level: MT5LogLevel.DEBUG,
                operation,
                message,
                metadata,
            };
            console.debug(this.formatLogEntry(entry));
        }
    }
}
exports.MT5Logger = MT5Logger;
//# sourceMappingURL=mt5.logger.js.map
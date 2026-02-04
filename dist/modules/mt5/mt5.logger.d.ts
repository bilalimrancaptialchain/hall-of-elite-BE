/**
 * MT5 module logger.
 * Created to centralize structured logs for MT5 operations.
 */
export declare enum MT5LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
export interface MT5LogEntry {
    timestamp: Date;
    level: MT5LogLevel;
    operation: string;
    message: string;
    metadata?: Record<string, unknown>;
    error?: Error;
}
export declare class MT5Logger {
    private static formatLogEntry;
    static info(operation: string, message: string, metadata?: Record<string, unknown>): void;
    static warn(operation: string, message: string, metadata?: Record<string, unknown>): void;
    static error(operation: string, message: string, error?: Error, metadata?: Record<string, unknown>): void;
    static debug(operation: string, message: string, metadata?: Record<string, unknown>): void;
}
//# sourceMappingURL=mt5.logger.d.ts.map
interface LogContext {
    [key: string]: unknown;
}
export declare const PersistenceLogger: {
    info: (scope: string, message: string, context?: LogContext) => void;
    warn: (scope: string, message: string, context?: LogContext) => void;
    error: (scope: string, message: string, error?: Error, context?: LogContext) => void;
};
export {};
//# sourceMappingURL=logger.d.ts.map
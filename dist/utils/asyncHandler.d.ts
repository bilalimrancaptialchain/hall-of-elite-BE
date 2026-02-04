import { Request, Response, NextFunction } from "express";
/**
 * Wrapper for async route handlers to catch errors and pass them to Express error handler
 */
export declare const asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=asyncHandler.d.ts.map
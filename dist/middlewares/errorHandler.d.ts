import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
export declare class AppError extends Error {
    statusCode: number;
    code?: string;
    constructor(message: string, statusCode?: number, code?: string);
}
export declare const errorHandler: (err: AppError | ZodError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=errorHandler.d.ts.map
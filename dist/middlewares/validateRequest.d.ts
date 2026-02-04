import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
interface ValidationSchemas {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
}
export declare const validateRequest: (schemas: ValidationSchemas) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=validateRequest.d.ts.map
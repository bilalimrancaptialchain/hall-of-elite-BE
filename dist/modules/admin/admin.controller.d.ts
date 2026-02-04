import { Request, Response, NextFunction } from "express";
export declare const getTierConfigs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getRewardConfigs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTierConfigById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=admin.controller.d.ts.map
/**
 * MT5 controller layer.
 * Created to expose MT5 endpoints and handle HTTP request/response flow.
 */
import { Request, Response, NextFunction } from "express";
/**
 * Get all MT5 accounts
 */
export declare const getAccounts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get trades for a specific account
 */
export declare const getTrades: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get MT5 connection status
 */
export declare const getConnectionStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Connect to MT5
 */
export declare const connect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Disconnect from MT5
 */
export declare const disconnect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=mt5.controller.d.ts.map
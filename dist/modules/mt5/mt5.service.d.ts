import { MT5AccountDTO, MT5TradeDTO, MT5ConnectionStatusDTO } from "./mt5.dto";
/**
 * MT5 Service
 * Business logic layer for MT5 operations
 * Handles data normalization, validation, and orchestration
 */
export declare class MT5Service {
    private client;
    constructor();
    /**
     * Normalize and validate MT5 account data
     */
    private normalizeAccount;
    /**
     * Normalize and validate MT5 trade data
     */
    private normalizeTrade;
    /**
     * Get all trader accounts
     */
    getAccounts(): Promise<MT5AccountDTO[]>;
    /**
     * Get trades for a specific account
     */
    getTrades(accountId: string, startDate?: Date, endDate?: Date): Promise<MT5TradeDTO[]>;
    /**
     * Get connection status
     */
    getConnectionStatus(): Promise<MT5ConnectionStatusDTO>;
    /**
     * Connect to MT5
     */
    connect(): Promise<MT5ConnectionStatusDTO>;
    /**
     * Disconnect from MT5
     */
    disconnect(): Promise<void>;
}
//# sourceMappingURL=mt5.service.d.ts.map
/**
 * MT5 client wrapper.
 * Created to encapsulate MT5 auth, retries, and raw data fetching.
 */
import { MT5AccountDTO, MT5TradeDTO, MT5ConnectionStatusDTO } from "./mt5.dto";
/**
 * MT5 Client
 * Handles connection, authentication, and data fetching from MT5 bridge/service
 */
export declare class MT5Client {
    private isConnected;
    private server?;
    private lastSync?;
    private authToken?;
    private credentials?;
    private readonly retryOptions;
    constructor();
    /**
     * Sleep utility for retry delays
     */
    private sleep;
    /**
     * Retry wrapper with exponential backoff
     */
    private withRetry;
    /**
     * Authenticate with MT5 service
     * In production, this would call the actual MT5 API
     */
    private authenticate;
    /**
     * Connect to MT5 service
     */
    connect(): Promise<MT5ConnectionStatusDTO>;
    /**
     * Disconnect from MT5 service
     */
    disconnect(): Promise<void>;
    /**
     * Ensure connection is established
     */
    private ensureConnected;
    /**
     * Fetch all trader accounts from MT5
     */
    fetchAccounts(): Promise<MT5AccountDTO[]>;
    /**
     * Fetch trades for a specific account
     */
    fetchTrades(accountId: string, startDate?: Date, endDate?: Date): Promise<MT5TradeDTO[]>;
    /**
     * Get current connection status
     */
    getConnectionStatus(): MT5ConnectionStatusDTO;
}
//# sourceMappingURL=mt5.client.d.ts.map
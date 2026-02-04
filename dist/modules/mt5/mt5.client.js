"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MT5Client = void 0;
const mt5_logger_1 = require("./mt5.logger");
const env_1 = require("../../config/env");
const errorHandler_1 = require("../../middlewares/errorHandler");
/**
 * MT5 Client
 * Handles connection, authentication, and data fetching from MT5 bridge/service
 */
class MT5Client {
    constructor() {
        this.isConnected = false;
        this.retryOptions = {
            maxAttempts: parseInt(env_1.env.MT5_RETRY_ATTEMPTS || "3", 10),
            delayMs: parseInt(env_1.env.MT5_RETRY_DELAY_MS || "1000", 10),
            backoffMultiplier: 2,
        };
        // Load credentials from environment (never log passwords)
        if (env_1.env.MT5_SERVER && env_1.env.MT5_LOGIN && env_1.env.MT5_PASSWORD) {
            this.credentials = {
                server: env_1.env.MT5_SERVER,
                login: env_1.env.MT5_LOGIN,
                password: env_1.env.MT5_PASSWORD,
                apiUrl: env_1.env.MT5_API_URL,
                apiKey: env_1.env.MT5_API_KEY,
            };
            mt5_logger_1.MT5Logger.info("MT5_CLIENT", "MT5 credentials loaded from environment");
        }
        else {
            mt5_logger_1.MT5Logger.warn("MT5_CLIENT", "MT5 credentials not found in environment, using mock mode");
        }
    }
    /**
     * Sleep utility for retry delays
     */
    async sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * Retry wrapper with exponential backoff
     */
    async withRetry(operation, fn, options = this.retryOptions) {
        let lastError;
        let delay = options.delayMs;
        for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
            try {
                mt5_logger_1.MT5Logger.debug(operation, `Attempt ${attempt}/${options.maxAttempts}`);
                return await fn();
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                if (attempt === options.maxAttempts) {
                    mt5_logger_1.MT5Logger.error(operation, `Failed after ${options.maxAttempts} attempts`, lastError, { attempts: attempt });
                    throw lastError;
                }
                mt5_logger_1.MT5Logger.warn(operation, `Attempt ${attempt} failed, retrying in ${delay}ms`, {
                    attempt,
                    error: lastError.message,
                });
                await this.sleep(delay);
                delay *= options.backoffMultiplier || 2;
            }
        }
        throw lastError || new Error("Retry failed without error");
    }
    /**
     * Authenticate with MT5 service
     * In production, this would call the actual MT5 API
     */
    async authenticate() {
        if (!this.credentials) {
            mt5_logger_1.MT5Logger.warn("MT5_AUTH", "No credentials available, using mock authentication");
            return "mock-auth-token";
        }
        try {
            // TODO: Replace with actual MT5 API authentication
            // Example:
            // const response = await fetch(`${this.credentials.apiUrl}/auth`, {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //     "X-API-Key": this.credentials.apiKey || "",
            //   },
            //   body: JSON.stringify({
            //     server: this.credentials.server,
            //     login: this.credentials.login,
            //     password: this.credentials.password,
            //   }),
            // });
            // if (!response.ok) throw new Error(`Auth failed: ${response.statusText}`);
            // const data = await response.json();
            // return data.token;
            // Mock authentication for MVP
            mt5_logger_1.MT5Logger.info("MT5_AUTH", "Authentication successful (mock)");
            return "mock-auth-token";
        }
        catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            mt5_logger_1.MT5Logger.error("MT5_AUTH", "Authentication failed", err);
            throw new errorHandler_1.AppError("MT5 authentication failed", 401, "MT5_AUTH_ERROR");
        }
    }
    /**
     * Connect to MT5 service
     */
    async connect() {
        try {
            mt5_logger_1.MT5Logger.info("MT5_CONNECT", "Initiating MT5 connection");
            if (this.isConnected && this.authToken) {
                mt5_logger_1.MT5Logger.info("MT5_CONNECT", "Already connected");
                return {
                    connected: true,
                    server: this.server,
                    lastSync: this.lastSync,
                };
            }
            // Authenticate
            this.authToken = await this.withRetry("MT5_CONNECT", () => this.authenticate());
            // Set connection state
            this.isConnected = true;
            this.server = this.credentials?.server || "demo.mt5.server";
            this.lastSync = new Date();
            mt5_logger_1.MT5Logger.info("MT5_CONNECT", "Connection established", {
                server: this.server,
                lastSync: this.lastSync.toISOString(),
            });
            return {
                connected: true,
                server: this.server,
                lastSync: this.lastSync,
            };
        }
        catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            mt5_logger_1.MT5Logger.error("MT5_CONNECT", "Connection failed", err);
            this.isConnected = false;
            this.authToken = undefined;
            return {
                connected: false,
                error: err.message,
            };
        }
    }
    /**
     * Disconnect from MT5 service
     */
    async disconnect() {
        try {
            mt5_logger_1.MT5Logger.info("MT5_DISCONNECT", "Disconnecting from MT5");
            // TODO: Call MT5 API to invalidate token
            // if (this.authToken) {
            //   await fetch(`${this.credentials?.apiUrl}/auth/logout`, {
            //     method: "POST",
            //     headers: {
            //       Authorization: `Bearer ${this.authToken}`,
            //     },
            //   });
            // }
            this.isConnected = false;
            this.server = undefined;
            this.lastSync = undefined;
            this.authToken = undefined;
            mt5_logger_1.MT5Logger.info("MT5_DISCONNECT", "Disconnected successfully");
        }
        catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            mt5_logger_1.MT5Logger.error("MT5_DISCONNECT", "Disconnect failed", err);
            // Still clear local state even if API call fails
            this.isConnected = false;
            this.authToken = undefined;
        }
    }
    /**
     * Ensure connection is established
     */
    async ensureConnected() {
        if (!this.isConnected || !this.authToken) {
            const status = await this.connect();
            if (!status.connected) {
                throw new errorHandler_1.AppError("MT5 connection not available", 503, "MT5_NOT_CONNECTED");
            }
        }
    }
    /**
     * Fetch all trader accounts from MT5
     */
    async fetchAccounts() {
        return this.withRetry("MT5_FETCH_ACCOUNTS", async () => {
            await this.ensureConnected();
            mt5_logger_1.MT5Logger.info("MT5_FETCH_ACCOUNTS", "Fetching accounts");
            // TODO: Replace with actual MT5 API call
            // Example:
            // const response = await fetch(`${this.credentials?.apiUrl}/accounts`, {
            //   headers: {
            //     Authorization: `Bearer ${this.authToken}`,
            //   },
            // });
            // if (!response.ok) throw new Error(`Failed to fetch accounts: ${response.statusText}`);
            // const data = await response.json();
            // return this.normalizeAccounts(data);
            // Mock data for MVP
            const mockAccounts = [
                {
                    accountId: "mt5-account-1",
                    accountNumber: "12345678",
                    broker: "Demo Broker",
                    balance: 10000,
                    equity: 10500,
                    margin: 500,
                    freeMargin: 10000,
                    marginLevel: 2100,
                    currency: "USD",
                    leverage: 100,
                    server: this.server || "demo.mt5.server",
                    isActive: true,
                    createdAt: new Date("2024-01-01"),
                },
                {
                    accountId: "mt5-account-2",
                    accountNumber: "87654321",
                    broker: "Demo Broker",
                    balance: 25000,
                    equity: 27500,
                    margin: 1000,
                    freeMargin: 26500,
                    marginLevel: 2750,
                    currency: "USD",
                    leverage: 200,
                    server: this.server || "demo.mt5.server",
                    isActive: true,
                    createdAt: new Date("2024-02-01"),
                },
            ];
            // Validate accounts
            const validAccounts = mockAccounts.filter((account) => {
                const isValid = account.accountId &&
                    account.accountNumber &&
                    typeof account.balance === "number" &&
                    account.isActive !== undefined;
                if (!isValid) {
                    mt5_logger_1.MT5Logger.warn("MT5_FETCH_ACCOUNTS", "Skipping invalid account", {
                        accountId: account.accountId,
                    });
                }
                return isValid;
            });
            mt5_logger_1.MT5Logger.info("MT5_FETCH_ACCOUNTS", `Fetched ${validAccounts.length} valid accounts`, {
                total: mockAccounts.length,
                valid: validAccounts.length,
            });
            return validAccounts;
        });
    }
    /**
     * Fetch trades for a specific account
     */
    async fetchTrades(accountId, startDate, endDate) {
        if (!accountId || accountId.trim().length === 0) {
            throw new errorHandler_1.AppError("Account ID is required", 400, "INVALID_ACCOUNT_ID");
        }
        return this.withRetry("MT5_FETCH_TRADES", async () => {
            await this.ensureConnected();
            mt5_logger_1.MT5Logger.info("MT5_FETCH_TRADES", `Fetching trades for account: ${accountId}`, {
                accountId,
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString(),
            });
            // TODO: Replace with actual MT5 API call
            // Example:
            // const params = new URLSearchParams({
            //   accountId,
            //   ...(startDate && { startDate: startDate.toISOString() }),
            //   ...(endDate && { endDate: endDate.toISOString() }),
            // });
            // const response = await fetch(`${this.credentials?.apiUrl}/trades?${params}`, {
            //   headers: {
            //     Authorization: `Bearer ${this.authToken}`,
            //   },
            // });
            // if (!response.ok) throw new Error(`Failed to fetch trades: ${response.statusText}`);
            // const data = await response.json();
            // return this.normalizeTrades(data, accountId);
            // Mock data for MVP
            const mockTrades = [
                {
                    ticket: "ticket-001",
                    accountId,
                    symbol: "EURUSD",
                    type: "BUY",
                    volume: 0.1,
                    openPrice: 1.0850,
                    currentPrice: 1.0875,
                    closePrice: undefined,
                    profit: 25,
                    swap: 0,
                    commission: -0.5,
                    openTime: new Date("2024-01-15T10:00:00Z"),
                    closeTime: undefined,
                    comment: "Manual trade",
                    isOpen: true,
                },
                {
                    ticket: "ticket-002",
                    accountId,
                    symbol: "GBPUSD",
                    type: "SELL",
                    volume: 0.2,
                    openPrice: 1.2650,
                    currentPrice: 1.2625,
                    closePrice: 1.2625,
                    profit: 50,
                    swap: 0,
                    commission: -1.0,
                    openTime: new Date("2024-01-14T14:30:00Z"),
                    closeTime: new Date("2024-01-15T16:00:00Z"),
                    comment: "Closed trade",
                    isOpen: false,
                },
                {
                    ticket: "ticket-003",
                    accountId,
                    symbol: "USDJPY",
                    type: "BUY",
                    volume: 0.15,
                    openPrice: 150.25,
                    currentPrice: 150.10,
                    closePrice: undefined,
                    profit: -22.5,
                    swap: 0,
                    commission: -0.75,
                    openTime: new Date("2024-01-16T09:15:00Z"),
                    closeTime: undefined,
                    comment: "Open position",
                    isOpen: true,
                },
            ];
            // Filter by date range if provided
            let filteredTrades = mockTrades;
            if (startDate || endDate) {
                filteredTrades = mockTrades.filter((trade) => {
                    const tradeDate = trade.openTime;
                    if (startDate && tradeDate < startDate)
                        return false;
                    if (endDate && tradeDate > endDate)
                        return false;
                    return true;
                });
            }
            // Validate trades
            const validTrades = filteredTrades.filter((trade) => {
                const isValid = trade.ticket &&
                    trade.accountId === accountId &&
                    trade.symbol &&
                    (trade.type === "BUY" || trade.type === "SELL") &&
                    typeof trade.volume === "number" &&
                    trade.volume > 0 &&
                    typeof trade.openPrice === "number" &&
                    trade.openPrice > 0 &&
                    trade.openTime instanceof Date;
                if (!isValid) {
                    mt5_logger_1.MT5Logger.warn("MT5_FETCH_TRADES", "Skipping invalid trade", {
                        ticket: trade.ticket,
                        accountId,
                    });
                }
                return isValid;
            });
            mt5_logger_1.MT5Logger.info("MT5_FETCH_TRADES", `Fetched ${validTrades.length} valid trades`, {
                accountId,
                total: filteredTrades.length,
                valid: validTrades.length,
            });
            return validTrades;
        });
    }
    /**
     * Get current connection status
     */
    getConnectionStatus() {
        return {
            connected: this.isConnected,
            server: this.server,
            lastSync: this.lastSync,
        };
    }
}
exports.MT5Client = MT5Client;
//# sourceMappingURL=mt5.client.js.map
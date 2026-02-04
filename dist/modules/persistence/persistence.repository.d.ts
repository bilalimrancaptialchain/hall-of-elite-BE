import { PrismaClient } from "@prisma/client";
import { Mt5AccountInput, Mt5TradeInput, Mt5TraderInput, Mt5TraderMetricsInput } from "./persistence.dto";
export interface TraderBundle {
    trader: Mt5TraderInput;
    accounts: Mt5AccountInput[];
    trades: Mt5TradeInput[];
    metrics?: Mt5TraderMetricsInput;
}
export interface PersistCounts {
    tradersInserted: number;
    tradersUpdated: number;
    accountsInserted: number;
    accountsUpdated: number;
    tradesInserted: number;
    tradesUpdated: number;
    metricsInserted: number;
    metricsUpdated: number;
}
export declare class PersistenceRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    persistTraderBundle(bundle: TraderBundle): Promise<PersistCounts>;
    private upsertTrader;
    private upsertAccount;
    private upsertTrade;
    private upsertMetrics;
    private resolveAccountId;
}
//# sourceMappingURL=persistence.repository.d.ts.map
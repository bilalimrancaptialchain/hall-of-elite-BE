import { TraderProfile } from "../types";
export declare class TraderService {
    getAllTraders(filters: {
        page?: number;
        limit?: number;
        tier?: string;
    }): Promise<never[]>;
    getTraderById(id: string): Promise<null>;
    getTraderMetrics(traderId: string): Promise<null>;
    getTraderProfile(id: string): Promise<TraderProfile | null>;
    getTraderProfileMock(id: string): Promise<TraderProfile>;
}
//# sourceMappingURL=trader.service.d.ts.map
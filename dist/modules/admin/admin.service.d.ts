import { TierConfigDTO, RewardConfigDTO } from "./admin.dto";
export declare class AdminService {
    getTierConfigs(): Promise<TierConfigDTO[]>;
    getRewardConfigs(): Promise<RewardConfigDTO[]>;
    getTierConfigById(tierId: string): Promise<TierConfigDTO | null>;
    private getStaticTierConfigs;
    private getStaticRewardConfigs;
    private getStaticTierConfigById;
}
//# sourceMappingURL=admin.service.d.ts.map
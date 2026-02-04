import { RewardEligibilityDTO } from "./rewards.dto";
export declare class RewardsService {
    getRewardEligibility(traderId: string): Promise<RewardEligibilityDTO | null>;
    getRewardEligibilityMock(traderId: string): Promise<RewardEligibilityDTO>;
}
//# sourceMappingURL=rewards.service.d.ts.map
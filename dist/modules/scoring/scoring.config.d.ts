import { TraderTier } from "../../types";
export declare const SCORING_RULES: {
    readonly eligibility: {
        readonly minTradingDays: 30;
        readonly minTotalTrades: 20;
        readonly minProfitFactor: 1.2;
        readonly maxDrawdownPct: 25;
        readonly minWinRatePct: 50;
    };
    readonly weights: {
        readonly profitFactor: 0.35;
        readonly winRatePct: 0.25;
        readonly drawdownPct: 0.25;
        readonly tradingDays: 0.15;
    };
    readonly normalization: {
        readonly profitFactor: {
            readonly min: 1;
            readonly max: 3;
        };
        readonly winRatePct: {
            readonly min: 40;
            readonly max: 80;
        };
        readonly drawdownPct: {
            readonly min: 0;
            readonly max: 40;
        };
        readonly tradingDays: {
            readonly min: 30;
            readonly max: 365;
        };
    };
    readonly tiers: readonly [{
        readonly tier: TraderTier.ELITE;
        readonly min: 85;
        readonly max: 100;
    }, {
        readonly tier: TraderTier.DIAMOND;
        readonly min: 70;
        readonly max: 84.99;
    }, {
        readonly tier: TraderTier.PLATINUM;
        readonly min: 55;
        readonly max: 69.99;
    }, {
        readonly tier: TraderTier.GOLD;
        readonly min: 40;
        readonly max: 54.99;
    }, {
        readonly tier: TraderTier.SILVER;
        readonly min: 25;
        readonly max: 39.99;
    }, {
        readonly tier: TraderTier.BRONZE;
        readonly min: 0;
        readonly max: 24.99;
    }];
    readonly precision: 2;
};
//# sourceMappingURL=scoring.config.d.ts.map
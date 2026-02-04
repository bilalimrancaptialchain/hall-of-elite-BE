import { ScoringResultDTO, ScoringRunSummaryDTO, TraderScoreDTO } from "./scoring.dto";
export declare class ScoringService {
    runScoring(): Promise<{
        summary: ScoringRunSummaryDTO;
        results: ScoringResultDTO[];
    }>;
    getTraderScore(traderId: string): Promise<TraderScoreDTO | null>;
    private fetchClosedTrades;
    private computeMetrics;
    private deriveMetricsFromTrades;
    private evaluateEligibility;
    private calculateScore;
    private assignTier;
    private rankEligible;
    private persistScores;
    private buildSummary;
    private logInfo;
}
//# sourceMappingURL=scoring.service.d.ts.map
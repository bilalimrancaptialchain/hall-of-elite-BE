import { SnapshotService } from "../snapshots";
import { OrchestratorOptions, PipelineInput, PipelineOutput } from "./orchestrator.types";
export declare class OrchestratorService {
    private readonly snapshotService;
    constructor(snapshotService?: SnapshotService);
    runPipeline(input: PipelineInput, options?: OrchestratorOptions): Promise<PipelineOutput>;
    private processTrader;
    private toFailedResult;
    private applyRanking;
    private persistSnapshotIfAny;
    private buildSummary;
}
//# sourceMappingURL=orchestrator.service.d.ts.map
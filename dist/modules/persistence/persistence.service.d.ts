import { Mt5NormalizedPayload, PersistSummary } from "./persistence.dto";
import { PersistenceRepository } from "./persistence.repository";
export declare class PersistenceService {
    private readonly repository;
    constructor(repository?: PersistenceRepository);
    normalizeMt5Users(rawUsers: unknown[]): {
        payload: Mt5NormalizedPayload;
        skipped: number;
    };
    persistNormalizedPayload(payload: Mt5NormalizedPayload): Promise<PersistSummary>;
    persistFromRawUsers(rawUsers: unknown[]): Promise<PersistSummary>;
}
//# sourceMappingURL=persistence.service.d.ts.map
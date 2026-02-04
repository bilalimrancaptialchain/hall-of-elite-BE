import { SnapshotMetadata, TraderSnapshotInput, EliteSnapshot } from "../types/snapshot.types";
import { SnapshotRepository } from "./snapshot.repository";
export declare class SnapshotService {
    private readonly repository;
    constructor(repository?: SnapshotRepository);
    /**
     * Persist a new snapshot for a scoring run in an idempotent way.
     * If a snapshot with the same runKey already exists, it is returned as-is.
     */
    persistSnapshot(metadata: SnapshotMetadata, traders: TraderSnapshotInput[]): Promise<EliteSnapshot>;
}
//# sourceMappingURL=snapshot.service.d.ts.map
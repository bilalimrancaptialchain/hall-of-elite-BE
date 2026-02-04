import { SnapshotMetadata, TraderSnapshotInput, EliteSnapshot } from "../types/snapshot.types";
export declare class SnapshotRepository {
    createSnapshotRun(metadata: SnapshotMetadata, traders: TraderSnapshotInput[]): Promise<EliteSnapshot>;
    findSnapshotByRunKey(runKey: string): Promise<EliteSnapshot | null>;
    findLatestSnapshot(): Promise<EliteSnapshot | null>;
}
//# sourceMappingURL=snapshot.repository.d.ts.map
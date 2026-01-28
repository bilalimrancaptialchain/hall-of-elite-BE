import { SnapshotMetadata, TraderSnapshotInput, EliteSnapshot } from "../types/snapshot.types";
import { SnapshotRepository } from "./snapshot.repository";

export class SnapshotService {
  constructor(private readonly repository: SnapshotRepository = new SnapshotRepository()) {}

  /**
   * Persist a new snapshot for a scoring run in an idempotent way.
   * If a snapshot with the same runKey already exists, it is returned as-is.
   */
  async persistSnapshot(
    metadata: SnapshotMetadata,
    traders: TraderSnapshotInput[]
  ): Promise<EliteSnapshot> {
    const existing = await this.repository.findSnapshotByRunKey(metadata.runKey);
    if (existing) {
      return existing;
    }

    return this.repository.createSnapshotRun(metadata, traders);
  }
}

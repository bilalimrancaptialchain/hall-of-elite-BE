"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotService = void 0;
const snapshot_repository_1 = require("./snapshot.repository");
class SnapshotService {
    constructor(repository = new snapshot_repository_1.SnapshotRepository()) {
        this.repository = repository;
    }
    /**
     * Persist a new snapshot for a scoring run in an idempotent way.
     * If a snapshot with the same runKey already exists, it is returned as-is.
     */
    async persistSnapshot(metadata, traders) {
        const existing = await this.repository.findSnapshotByRunKey(metadata.runKey);
        if (existing) {
            return existing;
        }
        return this.repository.createSnapshotRun(metadata, traders);
    }
}
exports.SnapshotService = SnapshotService;
//# sourceMappingURL=snapshot.service.js.map
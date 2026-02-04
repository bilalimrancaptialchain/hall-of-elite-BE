"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const client_1 = require("../prisma/client");
class BaseRepository {
    constructor(model) {
        this.client = client_1.prisma;
        this.model = model;
    }
    async findById(id) {
        const model = this.client[this.model];
        return model.findUnique({
            where: { id },
        });
    }
    async findMany(where, options) {
        const model = this.client[this.model];
        const query = {};
        if (where) {
            query.where = where;
        }
        if (options?.take) {
            query.take = options.take;
        }
        if (options?.skip) {
            query.skip = options.skip;
        }
        if (options?.orderBy) {
            query.orderBy = options.orderBy;
        }
        return model.findMany(query);
    }
    async count(where) {
        const model = this.client[this.model];
        const query = {};
        if (where) {
            query.where = where;
        }
        return model.count(query);
    }
    async findFirst(where) {
        const model = this.client[this.model];
        const query = {};
        if (where) {
            query.where = where;
        }
        return model.findFirst(query);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTradersQuerySchema = exports.getTraderParamsSchema = void 0;
const zod_1 = require("zod");
exports.getTraderParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "Trader ID is required"),
});
exports.getTradersQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    tier: zod_1.z.string().optional(),
});
//# sourceMappingURL=trader.validator.js.map
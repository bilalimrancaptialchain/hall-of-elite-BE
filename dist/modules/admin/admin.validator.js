"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTierConfigByIdParamsSchema = void 0;
const zod_1 = require("zod");
exports.getTierConfigByIdParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "Tier ID is required"),
});
//# sourceMappingURL=admin.validator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTraderRewardsParamsSchema = void 0;
const zod_1 = require("zod");
exports.getTraderRewardsParamsSchema = zod_1.z.object({
    id: zod_1.z.string().uuid("Invalid trader ID format"),
});
//# sourceMappingURL=rewards.validator.js.map
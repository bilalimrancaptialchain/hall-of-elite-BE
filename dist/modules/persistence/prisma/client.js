"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === "production") {
    exports.prisma = prisma = new client_1.PrismaClient({ log: ["error"] });
}
else {
    if (!global.__persistencePrisma) {
        global.__persistencePrisma = new client_1.PrismaClient({ log: ["query", "error", "warn"] });
    }
    exports.prisma = prisma = global.__persistencePrisma;
}
//# sourceMappingURL=client.js.map
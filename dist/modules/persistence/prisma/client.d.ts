import { PrismaClient } from "@prisma/client";
declare let prisma: PrismaClient;
declare global {
    var __persistencePrisma: PrismaClient | undefined;
}
export { prisma };
//# sourceMappingURL=client.d.ts.map
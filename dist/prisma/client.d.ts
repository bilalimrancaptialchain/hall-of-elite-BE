import { PrismaClient } from "@prisma/client";
declare let prisma: PrismaClient;
declare global {
    var __prisma: PrismaClient | undefined;
}
export { prisma };
export declare function connectDatabase(): Promise<void>;
export declare function disconnectDatabase(): Promise<void>;
//# sourceMappingURL=client.d.ts.map
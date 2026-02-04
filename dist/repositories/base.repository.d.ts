import { PrismaClient } from "@prisma/client";
export declare class BaseRepository<T extends {
    id: string;
}> {
    protected client: PrismaClient;
    protected model: keyof PrismaClient;
    constructor(model: keyof PrismaClient);
    findById(id: string): Promise<T | null>;
    findMany(where?: Record<string, unknown>, options?: {
        take?: number;
        skip?: number;
        orderBy?: Record<string, "asc" | "desc">;
    }): Promise<T[]>;
    count(where?: Record<string, unknown>): Promise<number>;
    findFirst(where?: Record<string, unknown>): Promise<T | null>;
}
//# sourceMappingURL=base.repository.d.ts.map
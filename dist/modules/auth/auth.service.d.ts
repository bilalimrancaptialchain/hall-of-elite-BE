import { RegisterInput, LoginInput } from "./auth.validator";
import { AuthResponseDTO, UserPayload } from "./auth.dto";
export declare class AuthService {
    private readonly SALT_ROUNDS;
    register(data: RegisterInput): Promise<AuthResponseDTO>;
    login(data: LoginInput): Promise<AuthResponseDTO>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyToken(token: string): UserPayload;
    /** Get full user for authenticated request (e.g. GET /auth/me). */
    getUserById(userId: string): Promise<{
        id: string;
        email: string;
        displayName: string;
        role: string;
    } | null>;
    private generateToken;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map
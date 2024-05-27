import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../servicies/auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}

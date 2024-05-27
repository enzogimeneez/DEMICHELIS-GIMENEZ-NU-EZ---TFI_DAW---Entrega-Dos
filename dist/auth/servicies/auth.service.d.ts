import { LoginDto } from "../dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UsuariosService } from "./usuarios.service";
export declare class AuthService {
    private usuariosService;
    private jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}

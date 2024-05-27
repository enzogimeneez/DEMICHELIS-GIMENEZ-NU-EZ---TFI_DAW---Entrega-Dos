import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UsuariosService } from '../servicies/usuarios.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private usuariosService;
    private reflector;
    constructor(jwtService: JwtService, usuariosService: UsuariosService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}

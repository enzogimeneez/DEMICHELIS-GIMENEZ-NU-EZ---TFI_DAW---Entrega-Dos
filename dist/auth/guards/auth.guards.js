"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
const usuarios_service_1 = require("../servicies/usuarios.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, usuariosService, reflector) {
        this.jwtService = jwtService;
        this.usuariosService = usuariosService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const usuario = await this.usuariosService.findOneById(payload.sub);
            const roles = await this.reflector.get(roles_decorator_1.Roles, context.getHandler());
            if (!roles) {
                request['usuario'] = usuario;
                return true;
            }
            if (roles.includes(usuario.rol)) {
                request['usuario'] = usuario;
                return true;
            }
            throw new common_1.UnauthorizedException('Permisos insuficientes');
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        usuarios_service_1.UsuariosService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guards.js.map
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("./usuarios.service");
let AuthService = class AuthService {
    constructor(usuariosService, jwtService) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const usuario = await this.usuariosService.obtenerUsuarioPorNombreDeUsuario(loginDto.nombreUsuario);
        if (!usuario) {
            throw new common_1.BadRequestException("Nombre de usuario no valido");
        }
        console.log(usuario);
        const claveCorrecta = bcrypt.compareSync(loginDto.clave, usuario.clave);
        console.log(loginDto.clave, usuario.clave);
        console.log(claveCorrecta);
        if (!claveCorrecta) {
            throw new common_1.BadRequestException("Clave incorrecta");
        }
        const token = this.jwtService.sign({
            sub: usuario.id,
            rol: usuario.rol,
        });
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
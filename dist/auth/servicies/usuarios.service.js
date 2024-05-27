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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../entities/usuario.entity");
const typeorm_2 = require("typeorm");
const estado_usuario_enum_1 = require("../enums/estado-usuario.enum");
let UsuariosService = class UsuariosService {
    constructor(usuariosRepo) {
        this.usuariosRepo = usuariosRepo;
    }
    async obtenerUsuarioPorNombreDeUsuario(nombreUsuario) {
        const usuario = await this.usuariosRepo.findOne({
            where: {
                nombreUsuario: nombreUsuario,
                estado: estado_usuario_enum_1.EstadosUsuarioEnum.ACTIVO
            },
        });
        return usuario;
    }
    async obtenerUsuarios() {
        const usuarios = await this.usuariosRepo.find({
            where: {
                estado: estado_usuario_enum_1.EstadosUsuarioEnum.ACTIVO,
            },
        });
        return usuarios;
    }
    async findOneById(id) {
        const usuario = await this.usuariosRepo.findOne({
            where: {
                id,
                estado: estado_usuario_enum_1.EstadosUsuarioEnum.ACTIVO,
            },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException('No existe un usuario con ese nombre de usuario');
        }
        return usuario;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map
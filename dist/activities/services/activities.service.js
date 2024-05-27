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
exports.ActividadesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_entity_1 = require("../entities/activity.entity");
const typeorm_2 = require("typeorm");
const estados_enum_1 = require("../enums/estados.enum");
const roles_enum_1 = require("../../auth/enums/roles.enum");
let ActividadesService = class ActividadesService {
    constructor(actividadesRepo) {
        this.actividadesRepo = actividadesRepo;
    }
    async crearActividad(crearActividadDto, usuario) {
        const actividad = this.actividadesRepo.create();
        actividad.description = crearActividadDto.descripcion;
        actividad.priority = crearActividadDto.prioridad;
        await this.actividadesRepo.save(actividad);
    }
    async modificarActividad(modificarActividadDto, usuario) {
        console.log('Buscar actividad con ID:', modificarActividadDto.id);
        const actividad = await this.actividadesRepo.findOne({ where: { id: modificarActividadDto.id } });
        console.log('Actividad encontrada:', actividad);
        if (!actividad) {
            throw new Error('Actividad no encontrada');
        }
        if (modificarActividadDto.descripcion !== undefined) {
            actividad.description = modificarActividadDto.descripcion;
        }
        if (modificarActividadDto.prioridad !== undefined) {
            actividad.priority = modificarActividadDto.prioridad;
        }
        if (modificarActividadDto.idUsuarioActual !== undefined) {
            actividad.responsibleUser = modificarActividadDto.idUsuarioActual;
        }
        console.log(actividad);
        await this.actividadesRepo.save(actividad);
        console.log(actividad);
        return actividad;
    }
    async eliminarActividad(eliminarActividad, usuario) {
        console.log('Buscar actividad con ID:', eliminarActividad.id);
        const actividad = await this.actividadesRepo.findOne({ where: { id: eliminarActividad.id } });
        console.log('Actividad encontrada:', actividad);
        if (!actividad) {
            throw new Error('Actividad no encontrada');
        }
        console.log(actividad);
        await this.actividadesRepo.delete(actividad);
        console.log(actividad);
        return actividad;
    }
    async getActividades(usuario) {
        const rol = usuario.rol;
        const consulta = this.actividadesRepo
            .createQueryBuilder('actividad')
            .innerJoin('actividad.responsibleUser', 'usuario');
        if (rol === roles_enum_1.RolesEnum.EJECUTOR) {
            consulta.where('actividad.estado = :estado', {
                estado: estados_enum_1.EstadosActividadEnum.PENDIENTE
            }).andWhere('usuario.id = :idUsuario', {
                idUsuario: usuario.id
            });
        }
        return await consulta.getMany();
    }
};
exports.ActividadesService = ActividadesService;
exports.ActividadesService = ActividadesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActividadesService);
//# sourceMappingURL=activities.service.js.map
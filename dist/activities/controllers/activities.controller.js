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
exports.ActividadesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const create_activity_dto_1 = require("../dto/create-activity.dto");
const activities_service_1 = require("../services/activities.service");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_enum_1 = require("../../auth/enums/roles.enum");
const swagger_1 = require("@nestjs/swagger");
const auth_guards_1 = require("../../auth/guards/auth.guards");
const usuario_entity_1 = require("../../auth/entities/usuario.entity");
const modificar_activity_dto_1 = require("../dto/modificar-activity.dto");
const common_2 = require("@nestjs/common");
const eliminar_actividad_1 = require("../dto/eliminar-actividad");
let ActividadesController = class ActividadesController {
    constructor(actividadesService) {
        this.actividadesService = actividadesService;
    }
    async crearActividad(request, crearActividadDto) {
        request['usuario'] = {
            id: 1,
            rol: roles_enum_1.RolesEnum.ADMINISTRADOR,
        };
    }
    ;
    async modificarActividad(request, id, modificarActividadDto) {
        request['usuario'] = {
            id: 1,
            rol: roles_enum_1.RolesEnum.ADMINISTRADOR,
        };
        console.log('Request User:', request['usuario']);
        modificarActividadDto.id = id;
        console.log('DTO recibido:', modificarActividadDto);
        return await this.actividadesService.modificarActividad(modificarActividadDto, request['usuario']);
    }
    ;
    async eliminarActividad(request, id, eliminarActividad) {
        request['usuario'] = {
            id: 1,
            rol: roles_enum_1.RolesEnum.ADMINISTRADOR,
        };
        console.log('Request User:', request['usuario']);
        eliminarActividad.id = id;
        console.log('DTO recibido:', eliminarActividad);
        return await this.actividadesService.eliminarActividad(eliminarActividad, request['usuario']);
    }
    ;
    async getActividades(usuario) {
        return await this.actividadesService.getActividades(usuario);
    }
};
exports.ActividadesController = ActividadesController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)([roles_enum_1.RolesEnum.ADMINISTRADOR]),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_activity_dto_1.CreateActivityDto]),
    __metadata("design:returntype", Promise)
], ActividadesController.prototype, "crearActividad", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/activity.entity").Activity }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, modificar_activity_dto_1.ModificarActivityDto]),
    __metadata("design:returntype", Promise)
], ActividadesController.prototype, "modificarActividad", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/activity.entity").Activity }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, eliminar_actividad_1.EliminarActivityDto]),
    __metadata("design:returntype", Promise)
], ActividadesController.prototype, "eliminarActividad", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)([roles_enum_1.RolesEnum.ADMINISTRADOR, roles_enum_1.RolesEnum.EJECUTOR]),
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/activity.entity").Activity] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_entity_1.Usuario]),
    __metadata("design:returntype", Promise)
], ActividadesController.prototype, "getActividades", null);
exports.ActividadesController = ActividadesController = __decorate([
    (0, common_1.Controller)('/actividades'),
    __metadata("design:paramtypes", [activities_service_1.ActividadesService])
], ActividadesController);
//# sourceMappingURL=activities.controller.js.map
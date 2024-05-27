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
exports.Activity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const prioridades_enum_1 = require("../enums/prioridades.enum");
const usuario_entity_1 = require("../../auth/entities/usuario.entity");
let Activity = class Activity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, description: { required: true, type: () => String }, priority: { required: true, enum: require("../enums/prioridades.enum").PriorityEnum }, responsibleUser: { required: true, type: () => require("../../auth/entities/usuario.entity").Usuario } };
    }
};
exports.Activity = Activity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'idActividades' }),
    __metadata("design:type", Number)
], Activity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion' }),
    __metadata("design:type", String)
], Activity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prioridad' }),
    __metadata("design:type", String)
], Activity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'idUsuario_actual' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Activity.prototype, "responsibleUser", void 0);
exports.Activity = Activity = __decorate([
    (0, typeorm_1.Entity)({ name: 'actividades' })
], Activity);
//# sourceMappingURL=activity.entity.js.map
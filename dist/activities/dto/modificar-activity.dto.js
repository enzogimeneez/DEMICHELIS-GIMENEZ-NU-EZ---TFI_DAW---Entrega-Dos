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
exports.ModificarActivityDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prioridades_enum_1 = require("../enums/prioridades.enum");
class ModificarActivityDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => Number }, descripcion: { required: false, type: () => String }, idUsuarioActual: { required: true, type: () => Object }, prioridad: { required: false, enum: require("../enums/prioridades.enum").PriorityEnum } };
    }
}
exports.ModificarActivityDto = ModificarActivityDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ModificarActivityDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ModificarActivityDto.prototype, "idUsuarioActual", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ModificarActivityDto.prototype, "prioridad", void 0);
//# sourceMappingURL=modificar-activity.dto.js.map
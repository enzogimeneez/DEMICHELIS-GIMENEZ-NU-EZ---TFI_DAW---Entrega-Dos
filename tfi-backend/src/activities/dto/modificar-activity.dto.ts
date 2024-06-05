import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { PriorityEnum } from "../enums/prioridades.enum"

export class ModificarActivityDto {
    id?: number

    @IsOptional()
    descripcion?: string

    @IsOptional()
    idUsuarioActual

    @IsOptional()
    prioridad?: PriorityEnum
}
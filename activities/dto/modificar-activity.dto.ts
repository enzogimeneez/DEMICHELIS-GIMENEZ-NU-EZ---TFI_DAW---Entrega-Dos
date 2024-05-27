import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { PriorityEnum } from "../enums/prioridades.enum"

export class ModificarActivityDto {
    id?: number

    @IsOptional()
    descripción?: string

    @IsOptional()
    idUsuarioActual

    @IsOptional()
    prioridad?: PriorityEnum
}
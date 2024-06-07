import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { PriorityEnum } from "../enums/prioridades.enum"
import { EstadosActividadEnum } from "../enums/estados.enum"
import { Usuario } from "src/auth/entities/usuario.entity"

export class ModificarActivityDto {
    id?: number

    @IsOptional()
    descripcion?: string

    @IsOptional()
    idUsuarioActual

    @IsOptional()
    prioridad?: PriorityEnum

    @IsOptional()
    estado?: EstadosActividadEnum;

    @IsOptional()
    usuarioModificante: Usuario;
}
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { PriorityEnum } from "../enums/prioridades.enum"
import { Usuario } from "src/auth/entities/usuario.entity"

export class CreateActivityDto {

    @IsString()
    descripcion: string

    @IsNotEmpty()
    idUsuarioActual: number

    @IsNotEmpty()
    prioridad: PriorityEnum

    @IsOptional()
    usuarioCreador: Usuario
}
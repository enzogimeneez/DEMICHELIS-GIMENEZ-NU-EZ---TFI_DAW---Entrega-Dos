import { IsNotEmpty, IsString } from "class-validator"
import { PriorityEnum } from "../enums/prioridades.enum"

export class CreateActivityDto{

    @IsString()
    descripcion:string

    @IsNotEmpty()
    idUsuarioActual:number

    @IsNotEmpty()
    prioridad:PriorityEnum
}
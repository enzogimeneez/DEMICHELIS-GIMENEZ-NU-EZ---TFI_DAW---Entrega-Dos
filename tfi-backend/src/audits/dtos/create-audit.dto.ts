import { IsNotEmpty, IsString } from "class-validator"
import { PrimaryGeneratedColumn } from 'typeorm';
import { PriorityEnum } from '../enums/prioridades.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { EstadosActividadEnum } from '../enums/estados.enum';
import { OperacionAutoriaEnum } from '../enums/operacion.enum';
import { Activity } from 'src/activities/entities/activity.entity';

export class CreateAuditDto {
    @PrimaryGeneratedColumn({ name: 'idActividades_autoria' })
    id: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    priority: PriorityEnum

    @IsNotEmpty()
    status: EstadosActividadEnum

    @IsNotEmpty()
    operation: OperacionAutoriaEnum

    @IsNotEmpty()
    currentUserId: number;

    @IsNotEmpty()
    modifyingUserId: number;

    @IsNotEmpty()
    activityId: number;
}
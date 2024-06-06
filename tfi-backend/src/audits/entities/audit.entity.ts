import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PriorityEnum } from '../enums/prioridades.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { EstadosActividadEnum } from '../enums/estados.enum';
import { OperacionAutoriaEnum } from '../enums/operacion.enum';
import { Activity } from 'src/activities/entities/activity.entity';

@Entity({ name: 'actividades_autoria' })
export class Audit {
    @PrimaryGeneratedColumn({ name: 'idActividades_autoria' })
    id: number;

    @Column({ name: 'descripcion' })
    description: string;

    @Column({ name: 'prioridad' })
    priority: PriorityEnum

    @Column({ name: 'fecha_modificacion', type: "timestamp" })
    modificationDate: Date

    @Column({ name: 'estado' })
    status: EstadosActividadEnum

    @Column({ name: 'operacion' })
    operation: OperacionAutoriaEnum

    @Column({ name: 'idUsuario_actual' })
    currentUserId: number;

    @Column({ name: 'idUsuario_modificacion' })
    modifyingUserId: number;

    @Column({ name: 'idActividad' })
    activityId: number;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PriorityEnum } from '../enums/prioridades.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { EstadosActividadEnum } from '../enums/estados.enum';

@Entity({ name: 'actividades' })
export class Activity {
    @PrimaryGeneratedColumn({ name: 'idActividades' })
    id: number;

    @Column({ name: 'descripcion' })
    description: string;

    @Column({ name: 'prioridad' })
    priority: PriorityEnum

    @Column({ name: 'fecha_modificacion', type: "timestamp" })
    modificationDate: Date;

    @Column({ name: 'estado' })
    status: EstadosActividadEnum;

    @Column({ name: 'idUsuario_modificacion' })
    modifyingUser: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'idUsuario_actual' })
    responsibleUser: Usuario;
}
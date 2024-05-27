import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PriorityEnum } from '../enums/prioridades.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';


@Entity({ name: 'actividades' })
export class Activity {
    @PrimaryGeneratedColumn({ name: 'idActividades' })
    id: number;

    @Column({ name: 'descripción' })
    description: string;

    @Column({ name: 'prioridad' })
    priority: PriorityEnum

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'idUsuario_actual' })
    responsibleUser: Usuario;
}
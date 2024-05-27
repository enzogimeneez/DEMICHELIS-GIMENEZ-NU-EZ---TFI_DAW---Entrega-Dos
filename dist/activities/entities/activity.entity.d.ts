import { PriorityEnum } from '../enums/prioridades.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';
export declare class Activity {
    id: number;
    description: string;
    priority: PriorityEnum;
    responsibleUser: Usuario;
}

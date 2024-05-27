import { CreateActivityDto } from '../dto/create-activity.dto';
import { ModificarActivityDto } from '../dto/modificar-activity.dto';
import { Activity } from '../entities/activity.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { EliminarActivityDto } from '../dto/eliminar-actividad';
export declare class ActividadesService {
    private readonly actividadesRepo;
    constructor(actividadesRepo: Repository<Activity>);
    crearActividad(crearActividadDto: CreateActivityDto, usuario: Usuario): Promise<void>;
    modificarActividad(modificarActividadDto: ModificarActivityDto, usuario: any): Promise<Activity>;
    eliminarActividad(eliminarActividad: EliminarActivityDto, usuario: any): Promise<Activity>;
    getActividades(usuario: Usuario): Promise<Activity[]>;
}

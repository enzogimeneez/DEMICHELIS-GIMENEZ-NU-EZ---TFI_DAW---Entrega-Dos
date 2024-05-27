import { CreateActivityDto } from '../dto/create-activity.dto';
import { ActividadesService } from '../services/activities.service';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ModificarActivityDto } from '../dto/modificar-activity.dto';
import { EliminarActivityDto } from '../dto/eliminar-actividad';
export declare class ActividadesController {
    private readonly actividadesService;
    constructor(actividadesService: ActividadesService);
    crearActividad(request: Request, crearActividadDto: CreateActivityDto): Promise<void>;
    modificarActividad(request: Request, id: number, modificarActividadDto: ModificarActivityDto): Promise<import("../entities/activity.entity").Activity>;
    eliminarActividad(request: Request, id: number, eliminarActividad: EliminarActivityDto): Promise<import("../entities/activity.entity").Activity>;
    getActividades(usuario: Usuario): Promise<import("../entities/activity.entity").Activity[]>;
}

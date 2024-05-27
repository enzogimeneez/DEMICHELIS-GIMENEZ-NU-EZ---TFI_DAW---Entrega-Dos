import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import { Repository } from 'typeorm';
import { EstadosActividadEnum } from '../enums/estados.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { ModificarActivityDto } from '../dto/modificar-activity.dto';
import { EliminarActivityDto } from '../dto/eliminar-actividad';
//import { UsuariosService } from 'src/auth/servicies/usuarios.service';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Activity) private actividadesRepo: Repository<Activity>,
    // private usuariosService: UsuariosService,
  ) { }

  async crearActividad(crearActividadDto: CreateActivityDto) {
    const actividad = new Activity();
    actividad.description = crearActividadDto.descripcion;
    actividad.priority = crearActividadDto.prioridad;

    // TODO Solución temporal, hay que verificar que la ID del usuario exista y esto permite enviar CUALQUIER valor.
    // Tenemos que importar el Repository de Usuarios y hacer el crosschecking, pero al intentarlo tuve errores, solucionen pls.
    actividad.responsibleUser = { id: crearActividadDto.idUsuarioActual } as any;

    await this.actividadesRepo.save(actividad);
  }

  async modificarActividad(modificarActividadDto: ModificarActivityDto, usuario: any): Promise<Activity> {
    // Obtener la actividad existente del repositorio usando el ID proporcionado
    console.log('Buscar actividad con ID:', modificarActividadDto.id);

    const actividad = await this.actividadesRepo.findOne({ where: { id: modificarActividadDto.id } });
    console.log('Actividad encontrada:', actividad);

    // Verificar si la actividad existe
    if (!actividad) {
      throw new Error('Actividad no encontrada');
    }

    // Actualizar las propiedades de la actividad
    if (modificarActividadDto.descripción !== undefined) {
      actividad.description = modificarActividadDto.descripción;
    }
    if (modificarActividadDto.prioridad !== undefined) {
      actividad.priority = modificarActividadDto.prioridad;
    }
    if (modificarActividadDto.idUsuarioActual !== undefined) {
      actividad.responsibleUser = modificarActividadDto.idUsuarioActual;
    }

    console.log(actividad)

    // Guardar la actividad actualizada de nuevo en el repositorio
    await this.actividadesRepo.save(actividad);
    console.log(actividad)

    // Devolver la actividad actualizada, si es necesario
    return actividad;
  }

  async eliminarActividad(eliminarActividad: EliminarActivityDto, usuario: any): Promise<Activity> {
    // Obtener la actividad existente del repositorio usando el ID proporcionado
    console.log('Buscar actividad con ID:', eliminarActividad.id);

    const actividad = await this.actividadesRepo.findOne({ where: { id: eliminarActividad.id } });
    console.log('Actividad encontrada:', actividad);

    // Verificar si la actividad existe
    if (!actividad) {
      throw new Error('Actividad no encontrada');
    }

    console.log(actividad)

    // Guardar la actividad actualizada de nuevo en el repositorio
    await this.actividadesRepo.delete(actividad);
    console.log(actividad)

    // Devolver la actividad actualizada, si es necesario
    return actividad;

  }

  async getActividades(usuario: Usuario): Promise<Activity[]> {
    const rol: RolesEnum = usuario.rol;

    const consulta = this.actividadesRepo
      .createQueryBuilder('actividad')
      .innerJoin('actividad.responsibleUser', 'usuario');

    if (rol === RolesEnum.EJECUTOR) {
      consulta.where('actividad.estado = :estado', {
        estado: EstadosActividadEnum.PENDIENTE
      }).andWhere('usuario.id = :idUsuario', {
        idUsuario: usuario.id
      });
    }

    return await consulta.getMany();
  }

}
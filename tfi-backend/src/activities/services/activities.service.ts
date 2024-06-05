import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import { Like, Not, Repository } from 'typeorm';
import { EstadosActividadEnum } from '../enums/estados.enum';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { ModificarActivityDto } from '../dto/modificar-activity.dto';
import { EliminarActivityDto } from '../dto/eliminar-actividad'; import { UsuariosService } from 'src/auth/servicies/usuarios.service';
import { EstadosUsuarioEnum } from 'src/auth/enums/estado-usuario.enum';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Activity) private actividadesRepo: Repository<Activity>,
    private usuariosService: UsuariosService,
  ) { }

  async crearActividad(crearActividadDto: CreateActivityDto) {
    try {
      const usuarioResponsable = await this.usuariosService.obtenerUsuarioPorId(crearActividadDto.idUsuarioActual, EstadosUsuarioEnum.ACTIVO)

      const actividad = new Activity();

      actividad.description = crearActividadDto.descripcion;
      actividad.priority = crearActividadDto.prioridad;
      actividad.modificationDate = new Date();

      actividad.responsibleUser = usuarioResponsable;

      await this.actividadesRepo.save(actividad);

      return actividad;
    } catch (error) {
      throw new NotFoundException("No se encontró un usuario activo con la ID especificada para el usuario responsable.");
    }
  }

  async modificarActividad(modificarActividadDto: ModificarActivityDto): Promise<Activity> {
    try {
      const usuarioResponsable = await this.usuariosService.obtenerUsuarioPorId(modificarActividadDto.idUsuarioActual, EstadosUsuarioEnum.ACTIVO)

      const actividad = await this.actividadesRepo.findOne({ where: { id: modificarActividadDto.id } });

      if (!actividad) {
        throw new NotFoundException('Actividad no encontrada.');
      }


      if (modificarActividadDto.descripcion !== undefined) {
        actividad.description = modificarActividadDto.descripcion;
      }

      if (modificarActividadDto.prioridad !== undefined) {
        actividad.priority = modificarActividadDto.prioridad;
      }

      if (modificarActividadDto.idUsuarioActual !== undefined) {
        actividad.responsibleUser = usuarioResponsable;
      }

      actividad.modificationDate = new Date();

      await this.actividadesRepo.save(actividad);

      return actividad;
    } catch (error) {
      throw new NotFoundException("No se encontró un usuario activo con la ID especificada para el usuario responsable.");
    }
  }

  async eliminarActividad(eliminarActividad: EliminarActivityDto): Promise<Activity> {
    const actividad = await this.actividadesRepo.findOne({ where: { id: eliminarActividad.id } });

    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada.');
    }

    await this.actividadesRepo.delete(actividad);

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

  async getActividadesByResponsibleUser(userId: number): Promise<Activity[]> {
    const consulta = this.actividadesRepo
      .createQueryBuilder('actividad')
      .innerJoin('actividad.responsibleUser', 'usuario')
      .where('usuario.id = :idUsuario', {
        idUsuario: userId
      });
    return await consulta.getMany();
  }

  async getCompletedActividades(usuario: Usuario): Promise<Activity[]> {
    const rol: RolesEnum = usuario.rol;

    const consulta = this.actividadesRepo
      .createQueryBuilder('actividad')
      .innerJoin('actividad.responsibleUser', 'usuario')
      .where('actividad.estado = :estado', {
        estado: EstadosActividadEnum.FINALIZADO
      });

    if (rol === RolesEnum.EJECUTOR) {
      consulta.andWhere('usuario.id = :idUsuario', {
        idUsuario: usuario.id
      });
    }

    return await consulta.getMany();
  }

  async getPendingActividades(usuario: Usuario): Promise<Activity[]> {
    const rol: RolesEnum = usuario.rol;

    const consulta = this.actividadesRepo
      .createQueryBuilder('actividad')
      .innerJoin('actividad.responsibleUser', 'usuario')
      .where('actividad.estado = :estado', {
        estado: EstadosActividadEnum.PENDIENTE
      });

    if (rol === RolesEnum.EJECUTOR) {
      consulta.andWhere('usuario.id = :idUsuario', {
        idUsuario: usuario.id
      });
    }

    return await consulta.getMany();
  }

  async getErasedActividades(usuario: Usuario): Promise<Activity[]> {
    const rol: RolesEnum = usuario.rol;

    const consulta = this.actividadesRepo
      .createQueryBuilder('actividad')
      .innerJoin('actividad.responsibleUser', 'usuario')
      .where('actividad.estado = :estado', {
        estado: EstadosActividadEnum.ELIMINADO
      });

    if (rol === RolesEnum.EJECUTOR) {
      consulta.andWhere('usuario.id = :idUsuario', {
        idUsuario: usuario.id
      });
    }

    return await consulta.getMany();
  }

  async getActividadesByDescription(actividadDescripcion: string, usuario: Usuario) {
    const rol: RolesEnum = usuario.rol

    if (rol === RolesEnum.EJECUTOR) {
      const actividades: Activity[] = await this.actividadesRepo.find({
        where: {
          description: Like(`%${actividadDescripcion}%`),
          responsibleUser: usuario
        }
      });
    } else {
      const actividades: Activity[] = await this.actividadesRepo.find({
        where: {
          description: Like(`%${actividadDescripcion}%`)
        }
      });

      return actividades;
    }
  }

  async getActividadesById(actividadId: number) {
    const actividades: Activity = await this.actividadesRepo.findOne({
      where: {
        id: actividadId
      }
    });

    return actividades;
  }
}

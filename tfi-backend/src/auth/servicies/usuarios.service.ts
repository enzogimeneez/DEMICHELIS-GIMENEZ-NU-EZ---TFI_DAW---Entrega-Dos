import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Like, Repository } from "typeorm";
import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum";
import { CreateUserDto } from "../dtos/create-user.dto";
import { RolesEnum } from "../enums/roles.enum";
import { ModificarActivityDto } from "src/activities/dto/modificar-activity.dto";
import { ModifyUserDto } from "../dtos/modify-user.dto";

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>) { }

  async crearUsuario(crearUsuarioDto: CreateUserDto) {
    const usuario = new Usuario();
    usuario.email = crearUsuarioDto.email;
    usuario.clave = crearUsuarioDto.password;
    usuario.apellido = crearUsuarioDto.apellido;
    usuario.nombre = crearUsuarioDto.nombre;
    usuario.estado = crearUsuarioDto.estado;
    usuario.nombreUsuario = crearUsuarioDto.username;
    usuario.rol = crearUsuarioDto.rol;

    await this.usuariosRepo.save(usuario);
  }

  async modificarUsuario(id: number, modificarUserDto: ModifyUserDto): Promise<Usuario> {
    //const usuario: Usuario = await this.usuariosRepo.findOne({ where: { id: modificarUserDto.id } });
    const usuario: Usuario = await this.usuariosRepo.findOne({ where: { id: id } });

    if (!usuario) {
      throw new Error('No se encontró un usuario con la ID especificada.');
    }

    // Actualizar las propiedades de la actividad
    if (modificarUserDto.email !== undefined) {
      usuario.email = modificarUserDto.email;
    }

    if (modificarUserDto.password !== undefined) {
      usuario.clave = modificarUserDto.password;
    }

    if (modificarUserDto.apellido !== undefined) {
      usuario.apellido = modificarUserDto.apellido;
    }

    if (modificarUserDto.nombre !== undefined) {
      usuario.nombre = modificarUserDto.nombre;
    }

    if (modificarUserDto.username !== undefined) {
      usuario.nombreUsuario = modificarUserDto.username;
    }

    if (modificarUserDto.rol !== undefined) {
      usuario.rol = modificarUserDto.rol;
    }

    if (modificarUserDto.rol !== undefined) {
      usuario.estado = modificarUserDto.estado;
    }

    await this.usuariosRepo.save(usuario);

    return usuario;
  }

  async eliminarUsuario(userId: number): Promise<void> {
    const usuario = await this.obtenerUsuarioPorId(userId, EstadosUsuarioEnum.PENDIENTE);

    if (!usuario) { // Creo que esto es redundante.
      throw new NotFoundException('No se encontró un usuario pendiente con el ID especificado.');
    }

    await this.usuariosRepo.remove(usuario);
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: {
        estado: EstadosUsuarioEnum.ACTIVO // Comentar si no aparecen usuarios, es posible que los tenga a todos como "Pendiente" en la tablas.
      },
    });

    if (usuarios.length == 0) {
      throw new NotFoundException(
        'No existen usuarios activos en la base de datos.',
      );
    }

    return usuarios;
  }

  async obtenerUsuarioPorNombreDeUsuario(nombreUsuario: string): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepo.findOne({
      where: {
        nombreUsuario: nombreUsuario,
        estado: EstadosUsuarioEnum.ACTIVO
      }
    });

    if (!usuario) {
      throw new NotFoundException(
        'No existe un usuario activo con este nombre de usuario.',
      );
    }

    return usuario;
  }

  async obtenerListaDeUsuariosPorNombreDeUsuario(nombreUsuario: string): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: {
        nombreUsuario: Like(`%${nombreUsuario}%`),
        estado: EstadosUsuarioEnum.ACTIVO
      }
    });

    if (!usuarios || usuarios.length == 0) {
      throw new NotFoundException(
        'No existen usuarios activos con un nombre de usuario similar.',
      );
    }

    return usuarios;
  }

  async obtenerListaDeUsuariosPorNombreCompleto(nombreCompleto: string): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: [
        { nombre: Like(`%${nombreCompleto}%`), estado: EstadosUsuarioEnum.ACTIVO },
        { apellido: Like(`%${nombreCompleto}%`), estado: EstadosUsuarioEnum.ACTIVO }
      ],
    });

    if (!usuarios || usuarios.length == 0) {
      throw new NotFoundException(
        'No existen usuarios activos con un nombre completo similar.',
      );
    }

    return usuarios;
  }

  async obtenerListaDeUsuariosPorRol(userRole: RolesEnum): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: {
        rol: userRole,
        estado: EstadosUsuarioEnum.ACTIVO
      }
    });

    if (!usuarios || usuarios.length == 0) {
      throw new NotFoundException(
        'No existen usuarios activos con el rol especificado.',
      );
    }

    return usuarios;
  }

  async obtenerListaDeUsuariosPendientes(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: {
        estado: EstadosUsuarioEnum.PENDIENTE
      }
    });

    if (!usuarios || usuarios.length == 0) {
      throw new NotFoundException(
        'No existen usuarios pendientes.',
      );
    }

    return usuarios;
  }

  async obtenerUsuarioPorId(userId: number, userState: EstadosUsuarioEnum): Promise<Usuario> {
    console.log(userId)
    console.log(userState)
    const usuario = await this.usuariosRepo.findOne({
      where: {
        id: userId,
        estado: userState
      },
    });

    if (!usuario) {
      throw new NotFoundException(
        'No existe un usuario ' + userState + ' con esta ID de usuario.',
      );
    }

    return usuario;
  }
}
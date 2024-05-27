import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum";
import { CreateUserDto } from "../dtos/create-user.dto";

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

  async obtenerUsuarioPorNombreDeUsuario(nombreUsuario: string): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepo.findOne({
      where: {
        nombreUsuario: nombreUsuario,
        estado: EstadosUsuarioEnum.ACTIVO
      }
    });
    return usuario
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: {
        // estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    return usuarios;
  }

  async findOneById(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepo.findOne({
      where: {
        id,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException(
        'No existe un usuario con ese nombre de usuario',
      );
    }
    return usuario;
  }
}
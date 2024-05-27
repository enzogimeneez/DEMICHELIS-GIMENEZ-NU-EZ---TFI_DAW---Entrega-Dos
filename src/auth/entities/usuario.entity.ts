import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadosUsuarioEnum } from '../enums/estado-usuario.enum';
import { RolesEnum } from '../enums/roles.enum';
import { Exclude, Expose } from 'class-transformer'

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'idUsuarios' })
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Exclude()
  @Column({name: 'password' })
  clave: string;

  @Column({ name: 'apellido' })
  apellido: string;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ type: 'enum', enum: EstadosUsuarioEnum, name: 'estado' })
  estado: EstadosUsuarioEnum;

  @Column({ name: 'username' })
  nombreUsuario: string;

  @Column({ type: 'enum', enum: RolesEnum, name: 'rol' })
  rol: RolesEnum;

  @Expose()
  get nombreCompleto(): string {
    return this.apellido + ', ' + this.nombre;
  }
}
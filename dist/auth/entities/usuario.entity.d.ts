import { EstadosUsuarioEnum } from '../enums/estado-usuario.enum';
import { RolesEnum } from '../enums/roles.enum';
export declare class Usuario {
    id: number;
    email: string;
    clave: string;
    apellido: string;
    nombre: string;
    estado: EstadosUsuarioEnum;
    nombreUsuario: string;
    rol: RolesEnum;
    get nombreCompleto(): string;
}

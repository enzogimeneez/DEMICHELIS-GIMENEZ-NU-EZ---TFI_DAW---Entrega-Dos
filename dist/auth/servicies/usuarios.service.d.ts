import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
export declare class UsuariosService {
    private usuariosRepo;
    constructor(usuariosRepo: Repository<Usuario>);
    obtenerUsuarioPorNombreDeUsuario(nombreUsuario: string): Promise<Usuario>;
    obtenerUsuarios(): Promise<Usuario[]>;
    findOneById(id: number): Promise<Usuario>;
}

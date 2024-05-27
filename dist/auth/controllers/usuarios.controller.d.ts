import { UsuariosService } from '../servicies/usuarios.service';
export declare class UsuariosController {
    private usuariosService;
    constructor(usuariosService: UsuariosService);
    getUsuarios(): Promise<import("../entities/usuario.entity").Usuario[]>;
}

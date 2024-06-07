import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './servicies/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Usuario } from './entities/usuario.entity'
import { UsuariosService } from './servicies/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';

@Module({
    controllers: [AuthController, UsuariosController], // TODO DEFINIR EL CONTROLADOR DE ACTIVIDADES
    providers: [AuthService, UsuariosService],
    imports: [TypeOrmModule.forFeature([Usuario])],
    exports: [UsuariosService],
})
export class AuthModule { }
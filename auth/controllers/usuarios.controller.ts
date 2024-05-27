import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../servicies/usuarios.service';
import { Roles } from '../decorators/roles.decorator';
import { RolesEnum } from '../enums/roles.enum';
import { AuthGuard } from '../guards/auth.guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) { }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  //  @UseGuards(AuthGuard)
  @Post()
  async createUsuarios(@Body() crearUsuarioDto: CreateUserDto) {
    await this.usuariosService.crearUsuario(crearUsuarioDto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  //  @UseGuards(AuthGuard)
  async getUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }
} 
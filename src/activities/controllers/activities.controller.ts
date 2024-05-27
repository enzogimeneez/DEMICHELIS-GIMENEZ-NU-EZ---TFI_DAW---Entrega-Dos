import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { ActividadesService } from '../services/activities.service';
// import { AuthGuard } from 'src/auth/guards/auth.guard'; // Commented out for now
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { ModificarActivityDto } from '../dto/modificar-activity.dto';
import { Request } from '@nestjs/common';
import { EliminarActivityDto } from '../dto/eliminar-actividad';

@Controller('/actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) { }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard) // Commented out for now
  @Post()
  async crearActividad(
    @Req() request: Request,
    @Body() crearActividadDto: CreateActivityDto,
  ) {
    // Mock
    request['usuario'] = {
      id: 1,
      rol: RolesEnum.ADMINISTRADOR,
    };
  };

  @Put(':id')
  async modificarActividad(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() modificarActividadDto: ModificarActivityDto,
  ) {
      // Mock

  request['usuario'] = {
      id: 1,
      rol: RolesEnum.ADMINISTRADOR,
    };
  

    console.log('Request User:', request['usuario']); // Debug log
    modificarActividadDto.id = id;
    console.log('DTO recibido:', modificarActividadDto);

    return await this.actividadesService.modificarActividad(modificarActividadDto, request['usuario']);
  };


  @Delete(':id')
  async eliminarActividad(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() eliminarActividad: EliminarActivityDto,
  ) {
      // Mock

  request['usuario'] = {
      id: 1,
      rol: RolesEnum.ADMINISTRADOR,
    };
  

    console.log('Request User:', request['usuario']); // Debug log
    eliminarActividad.id = id;
    console.log('DTO recibido:', eliminarActividad);

    return await this.actividadesService.eliminarActividad(eliminarActividad, request['usuario']);
  };


  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard) // Comentado por ahora.
  @Get()
  async getActividades(@Body() usuario: Usuario) {
    return await this.actividadesService.getActividades(usuario);
  }
}

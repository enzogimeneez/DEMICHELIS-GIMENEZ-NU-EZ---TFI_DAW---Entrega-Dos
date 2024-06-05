import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { ActividadesService } from '../services/activities.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { PriorityEnum } from '../enums/prioridades.enum';
import { ModificarActivityDto } from '../dto/modificar-activity.dto';
import { EliminarActivityDto } from '../dto/eliminar-actividad';
import { Activity } from '../entities/activity.entity';

@Controller('/actividades')
export class ActividadesController {
  constructor(private actividadesService: ActividadesService) { }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Post()
  async crearActividad(@Body() crearActividadDto: CreateActivityDto) {
    await this.actividadesService.crearActividad(crearActividadDto);
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  @Put(':id')
  async modificarActividad(
    @Param('id') id: number,
    @Body() modificarActividadDto: ModificarActivityDto,
  ) {
    modificarActividadDto.id = id

    return await this.actividadesService.modificarActividad(modificarActividadDto);
  };

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Delete(':id')
  async eliminarActividad(
    @Param('id') id: number,
    @Body() eliminarActividad: EliminarActivityDto,
  ) {
    eliminarActividad.id = id;

    return await this.actividadesService.eliminarActividad(eliminarActividad);
  };

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  @Get()
  async getActividades(@Body() usuario: Usuario) {
    return await this.actividadesService.getActividades(usuario);
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Get("buscarPorUsuarioResponsable")
  async getActividadesByResponsibleUser(@Query('id') userId: number) {
    return await this.actividadesService.getActividadesByResponsibleUser(userId);
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  @Get("buscarActividadesCompletas")
  async getCompletedActividades(@Body() usuario: Usuario) {
    return await this.actividadesService.getCompletedActividades(usuario);
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  @Get("buscarActividadesPendientes")
  async getPendingActividades(@Body() usuario: Usuario) {
    return await this.actividadesService.getPendingActividades(usuario);
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  @Get("buscarActividadesEliminadas")
  async getErasedActividades(@Body() usuario: Usuario) {
    return await this.actividadesService.getErasedActividades(usuario);
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  @Get("buscarActividadesPorDescripcion")
  async getActividadesByDescription(@Query('actividadDescripcion') descripcion: string, @Body() usuario: Usuario): Promise<Activity[]> {
    return await this.actividadesService.getActividadesByDescription(descripcion, usuario);
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Get("buscarActividadesPorId")
  async getActividadesById(@Query('id') id: number): Promise<Activity> {
    return await this.actividadesService.getActividadesById(id);
  }
}
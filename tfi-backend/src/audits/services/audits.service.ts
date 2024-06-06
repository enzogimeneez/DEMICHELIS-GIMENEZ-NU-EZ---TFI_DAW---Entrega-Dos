import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadosUsuarioEnum } from 'src/auth/enums/estado-usuario.enum';
import { Audit } from '../entities/audit.entity';
import { CreateAuditDto } from '../dtos/create-audit.dto';
import { UsuariosService } from 'src/auth/servicies/usuarios.service';
import { ActividadesService } from 'src/activities/services/activities.service';

@Injectable()
export class AuditsService {
    constructor(
        @InjectRepository(Audit) private auditsRepo: Repository<Audit>,
        private usuariosService: UsuariosService,
        private activitiesService: ActividadesService
    ) { }

    async createAudit(createAuditDto: CreateAuditDto) {
        try {
            const currentUser = await this.usuariosService.obtenerUsuarioPorId(createAuditDto.currentUserId, EstadosUsuarioEnum.ACTIVO);
            const modifyingUser = await this.usuariosService.obtenerUsuarioPorId(createAuditDto.modifyingUserId, EstadosUsuarioEnum.ACTIVO);
            try {
                const activity = await this.activitiesService.getActividadesById(createAuditDto.activityId);

                const audit = new Audit();

                audit.description = createAuditDto.description;
                audit.priority = createAuditDto.priority;
                audit.modificationDate = new Date();
                audit.status = createAuditDto.status;
                audit.operation = createAuditDto.operation;
                audit.currentUserId = currentUser.id;
                audit.modifyingUserId = modifyingUser.id;
                audit.activityId = activity.id;

                await this.auditsRepo.save(audit);

                return audit;
            } catch (error) {
                throw new NotFoundException("No se encontró una actividad con la ID especificada para la actividad asociada a esta autoría.")
            }
        } catch (error) {
            throw new NotFoundException("No se encontró un usuario activo con la ID especificada para uno de los usuarios asociados a la autoría.");
        }
    }

    async getAudits(): Promise<Audit[]> {
        const query = this.auditsRepo
            .createQueryBuilder('actividades_autoria')

        return await query.getMany();
    }
}

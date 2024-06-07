import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from '../entities/audit.entity';
import { CreateAuditDto } from '../dtos/create-audit.dto';

@Injectable()
export class AuditsService {
    constructor(
        @InjectRepository(Audit) private auditsRepo: Repository<Audit>,
    ) { }

    async createAudit(createAuditDto: CreateAuditDto) {
        const audit = new Audit();

        // * Seguramente existen mejores implementaciones para esto, pero si sirve, sirve.
        const auditsArray = await this.getAudits();

        audit.id = auditsArray[auditsArray.length - 1].id + 1;
        audit.description = createAuditDto.description;
        audit.priority = createAuditDto.priority;
        audit.modificationDate = new Date();
        audit.status = createAuditDto.status;
        audit.operation = createAuditDto.operation;
        audit.currentUserId = createAuditDto.currentUserId;
        audit.modifyingUserId = createAuditDto.modifyingUserId;
        audit.activityId = createAuditDto.activityId;

        await this.auditsRepo.save(audit);

        return audit;
    }

    async getAudits(): Promise<Audit[]> {
        const query = this.auditsRepo
            .createQueryBuilder('actividades_autoria')

        return await query.getMany();
    }
}

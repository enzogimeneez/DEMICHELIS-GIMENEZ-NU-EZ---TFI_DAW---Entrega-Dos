import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { AuditsService } from '../services/audits.service';
import { CreateAuditDto } from '../dtos/create-audit.dto';

@Controller('/autoria')
export class AuditsController {
    constructor(private auditsService: AuditsService) { }

    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    @Post()
    async createAudit(@Body() createAuditDto: CreateAuditDto) {
        await this.auditsService.createAudit(createAuditDto);
    }

    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    @Get()
    async getAudits() {
        return await this.auditsService.getAudits();
    }
}
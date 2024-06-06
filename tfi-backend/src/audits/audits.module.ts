import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Audit } from './entities/audit.entity';
import { AuditsService } from './services/audits.service';
import { AuditsController } from './controllers/audits.controller';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
    imports: [TypeOrmModule.forFeature([Audit]), AuthModule, ActivitiesModule],
    controllers: [AuditsController],
    providers: [AuditsService],
    exports: [AuditsService]
})
export class AuditsModule { }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    AuthModule,
    ActivitiesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'username',
      password: 'password',
      database: 'tfi_db',
      autoLoadEntities: true,
      synchronize: false,      
      logging: true,
      logger:'advanced-console'
    }),
    JwtModule.register({
      global: true,
      secret: 'tpidawsecreto',
      signOptions: {
        expiresIn: '24h'
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
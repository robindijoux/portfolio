import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { RouterModule } from '@nestjs/core';
import { AuthenticationModule } from './authentication/authentication.module';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './authentication/JwtStrategy';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'project',
        module: ProjectModule,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: [
        `${__dirname}/env/.env.local`, 
        `${__dirname}/env/.env`
      ],
      load: [
        databaseConfig,
        jwtConfig
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return ({
          ...configService.get('database'),
          autoLoadEntities: true,
        })
      },
      inject: [ConfigService],
    }),
    ProjectModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}

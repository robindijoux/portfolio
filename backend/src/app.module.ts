import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { Paragraph } from './project/paragraph/entities/paragraph.entity';
import { RouterModule } from '@nestjs/core';
import { ParagraphModule } from './project/paragraph/paragraph.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'project',
        module: ProjectModule,
        children: [
          {
            path: ':projectId/paragraph',
            module: ParagraphModule,
          }
        ]
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/env/.env.local`],
      load: [
        databaseConfig
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
    ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

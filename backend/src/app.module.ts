import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { Paragraph } from './project/paragraph/entities/paragraph.entity';

@Module({
  imports: [
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
          entities: [
            Project,
            Paragraph
          ],
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

import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ParagraphModule } from './paragraph/paragraph.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ParagraphModule, JwtModule],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}

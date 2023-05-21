import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ParagraphService } from './paragraph/paragraph.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly paragraphService: ParagraphService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {

    const project = this.projectRepository.create({ ...createProjectDto });
    const createdProject = await this.projectRepository.save(project);

    return createdProject;
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({where:{id}});
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    let project = await this.projectRepository.findOne({where:{id}});
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    project = {
      ...project,
      ...updateProjectDto
    }

    return await this.projectRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.projectRepository.findOneBy({id});
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.projectRepository.remove(project);
  }
}

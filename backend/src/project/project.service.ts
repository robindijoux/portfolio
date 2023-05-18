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
    const { title, paragraphs } = createProjectDto;

    const project = this.projectRepository.create({ title });
    const createdProject = await this.projectRepository.save(project);

    if (paragraphs && paragraphs.length > 0) {
      const createdParagraphs = await Promise.all(
        paragraphs.map((paragraphData) =>
          this.paragraphService.create(createdProject.id, paragraphData),
        ),
      );
      createdProject.paragraphs = createdParagraphs;
    }

    return createdProject;
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: ['paragraphs'] });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({where:{id}, relations: ['paragraphs'] });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const { title, paragraphs } = updateProjectDto;

    const project = await this.projectRepository.findOne({where:{id}, relations: ['paragraphs'] });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (title) {
      project.title = title;
    }

    if (paragraphs && paragraphs.length > 0) {
      const updatedParagraphs = await Promise.all(
        paragraphs.map((paragraphData) =>
          this.paragraphService.update(project.id, paragraphData),
        ),
      );
      project.paragraphs = updatedParagraphs;
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

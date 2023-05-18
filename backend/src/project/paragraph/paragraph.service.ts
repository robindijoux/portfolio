import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';
import { Paragraph } from './entities/paragraph.entity';

@Injectable()
export class ParagraphService {
  constructor(
    @InjectRepository(Paragraph)
    private readonly paragraphRepository: Repository<Paragraph>,
  ) {}

  async create(
    projectId: string,
    createParagraphDto: CreateParagraphDto,
  ): Promise<Paragraph> {
    const paragraph = this.paragraphRepository.create({
      ...createParagraphDto,
      project: { id: projectId },
    });
    return await this.paragraphRepository.save(paragraph);
  }

  async findAll(projectId: string): Promise<Paragraph[]> {
    return await this.paragraphRepository.find({ where: { project: { id: projectId } } });
  }

  async findOne(projectId: string, paragraphId: string): Promise<Paragraph> {
    const paragraph = await this.paragraphRepository.findOne({
      where: { id: paragraphId, project: { id: projectId } },
    });
    if (!paragraph) {
      throw new NotFoundException(`Paragraph with id ${paragraphId} not found in project with id ${projectId}`);
    }
    return paragraph;
  }

  async update(
    projectId: string,
    updateParagraphDto: UpdateParagraphDto,
  ): Promise<Paragraph> {
    const targetParagraphId = updateParagraphDto.id;
    const toUpdate = JSON.parse(JSON.stringify(updateParagraphDto))
    const paragraph = await this.findOne(projectId, targetParagraphId);
    Object.assign(paragraph, toUpdate);
    return await this.paragraphRepository.save(paragraph);
  }

  async remove(projectId: string, paragraphId: string): Promise<void> {
    const paragraph = await this.findOne(projectId, paragraphId);
    await this.paragraphRepository.remove(paragraph);
  }
}

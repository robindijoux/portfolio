import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';
import { Paragraph } from './entities/paragraph.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('paragraphs')
export class ParagraphController {
  constructor(private readonly paragraphService: ParagraphService) {}

  @Post()
  async create(
    @Param('projectId') projectId: string,
    @Body() createParagraphDto: CreateParagraphDto,
  ): Promise<Paragraph> {
    return await this.paragraphService.create(projectId, createParagraphDto);
  }
  @Get()
  async findAll(@Param('projectId') projectId: string): Promise<Paragraph[]> {
    return await this.paragraphService.findAll(projectId);
  }
  @Get(':id')
  async findOne(
    @Param('projectId') projectId: string,
    @Param('id') paragraphId: string,
  ): Promise<Paragraph> {
    return await this.paragraphService.findOne(projectId, paragraphId);
  }
  @Patch(':id')
  async update(
    @Param('projectId') projectId: string,
    @Param('id') paragraphId: string,
    @Body() updateParagraphDto: UpdateParagraphDto,
  ): Promise<Paragraph> {
    return await this.paragraphService.update(projectId, paragraphId, updateParagraphDto);
  }
  @Delete(':id')
  async remove(
    @Param('projectId') projectId: string,
    @Param('id') paragraphId: string,
  ): Promise<void> {
    return await this.paragraphService.remove(projectId, paragraphId);
  }
}

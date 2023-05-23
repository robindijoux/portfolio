import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ParagraphService } from './paragraph.service';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';
import { Paragraph } from './entities/paragraph.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../authentication/AuthGuard';

@Controller('')
@ApiTags('paragraphs')
export class ParagraphController {
  constructor(private readonly paragraphService: ParagraphService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('projectId') projectId: string,
    @Param('id') paragraphId: string,
    @Body() updateParagraphDto: UpdateParagraphDto,
  ): Promise<Paragraph> {
    return await this.paragraphService.update(projectId, paragraphId, updateParagraphDto);
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async remove(
    @Param('projectId') projectId: string,
    @Param('id') paragraphId: string,
  ): Promise<void> {
    return await this.paragraphService.remove(projectId, paragraphId);
  }
}

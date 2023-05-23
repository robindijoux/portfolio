import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiNoContentResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../authentication/AuthGuard';

@Controller('')
@ApiTags('project')
export class ProjectController {
  private logger = new Logger('ProjectController');

  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Creates a new project' })
  create(@Body() createProjectDto: CreateProjectDto) {
    this.logger.log('Creating a new project');
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Returns all projects' })
  findAll() {
    this.logger.log('Fetching all projects');
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a specific project by ID' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching project with ID: ${id}`);
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updates a specific project by ID' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    this.logger.log(`Updating project with ID: ${id}`);
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Removes a specific project by ID' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  remove(@Param('id') id: string) {
    this.logger.log(`Deleting project with ID: ${id}`);
    return this.projectService.remove(id);
  }
}

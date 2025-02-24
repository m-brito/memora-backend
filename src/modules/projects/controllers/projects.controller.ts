// External Libraries
import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards'

// Decorators
import { CurrentUser } from 'src/auth/decorators'

// Entities
import { Project } from '../entities'

// Services
import { ProjectsService } from '../services/projects.service'

// Types
import { UserLoggedDto } from 'src/auth/dto'
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../dtos'

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: UserLoggedDto
  ): Promise<ProjectDto> {
    return this.projectsService.create(user, createProjectDto)
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Project> {
    return this.projectsService.findOne(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.projectsService.delete(id)
  }
}

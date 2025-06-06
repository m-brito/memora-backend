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
import { JwtAuthGuard, WithAuthenticationGuard } from 'src/auth/guards'

// Utils
import { CurrentUser, withAuthentication } from 'src/auth/decorators'

// Entities
import { Project } from '../entities'

// Services
import { ProjectsService } from '../services/projects.service'

// Types
import { UserLoggedDto } from 'src/auth/dto'
import {
  CreateProjectDto,
  ProjectDto,
  ShareProjectDto,
  UpdateProjectDto
} from '../dtos'

@Controller('projects')
@UseGuards(JwtAuthGuard, WithAuthenticationGuard)
@withAuthentication('ADMIN', 'USER')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @CurrentUser() user: UserLoggedDto
  ): Promise<ProjectDto> {
    return this.projectsService.create(user, createProjectDto)
  }

  @Post('/share/:id')
  async shareProject(
    @Param('id') id: number,
    @Body() shareProject: ShareProjectDto,
    @CurrentUser() user: UserLoggedDto
  ): Promise<ProjectDto> {
    return this.projectsService.shareProject(user, id, shareProject)
  }

  @Get()
  async findAllByUser(
    @CurrentUser() user: UserLoggedDto
  ): Promise<ProjectDto[]> {
    return this.projectsService.findAllByUser(user)
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: UserLoggedDto,
    @Param('id') id: number
  ): Promise<Project> {
    return this.projectsService.findOne(user, id)
  }

  @Put(':id')
  async update(
    @CurrentUser() user: UserLoggedDto,
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return this.projectsService.update(user, id, updateProjectDto)
  }

  @Delete(':id')
  async delete(
    @CurrentUser() user: UserLoggedDto,
    @Param('id') id: number
  ): Promise<void> {
    return this.projectsService.delete(user, id)
  }
}

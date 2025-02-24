// External Libraries
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

// Utils
import { toProjectDto } from '../mappers/toProjectDto'

// Entities
import { Project } from '../entities/project.entity'

// Repositories
import { ProjectsRepository } from '../repositories'
import { UsersRepository } from '@users/repositories/users.repository'

// Types
import { UserLoggedDto } from 'src/auth/dto'
import { UpdateProjectDto, CreateProjectDto, ProjectDto } from '../dtos'

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly userRepository: UsersRepository
  ) {}

  async create(
    userLogged: UserLoggedDto,
    createProjectDto: CreateProjectDto
  ): Promise<ProjectDto> {
    const idLogged = userLogged.userId
    const user = await this.userRepository.findOneBy({ id: idLogged })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    let project = new Project()
    project = {
      ...createProjectDto,
      user,
      created_at: new Date(),
      updated_at: new Date(),
      acronym: createProjectDto.acronym
    }

    this.projectsRepository.create(project)

    const newProject = await this.projectsRepository.save(project)

    return toProjectDto(newProject)
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({ relations: ['user'] })
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['user']
    })

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    return project
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto)
    return this.findOne(id)
  }

  async delete(id: number): Promise<void> {
    const project = await this.findOne(id)

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    await this.projectsRepository.delete(id)
  }
}

// External Libraries
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

// Utils
import { toProjectDto } from '../mappers/toProjectDto'

// Entities
import { Project } from '../entities/project.entity'

// Repositories
import { ProjectsRepository, ProjectsUserRepository } from '../repositories'
import { UsersRepository } from '@users/repositories/users.repository'

// Types
import { UserLoggedDto } from 'src/auth/dto'
import {
  UpdateProjectDto,
  CreateProjectDto,
  ProjectDto,
  ShareProjectDto,
  Permission,
  MembersDto
} from '../dtos'

@Injectable()
export class ProjectsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly projectUserRepository: ProjectsUserRepository
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
      acronym: createProjectDto.acronym,
      notes: [],
      feedbacks: [],
      projectUsers: []
    }

    this.projectsRepository.create(project)

    const newProject = await this.projectsRepository.save(project)

    return toProjectDto(newProject)
  }

  async shareProject(
    userLogged: UserLoggedDto,
    projectId: number,
    shareProjectDto: ShareProjectDto
  ): Promise<ProjectDto> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ['user']
    })

    if (
      typeof shareProjectDto.permission !== 'string' ||
      !(shareProjectDto.permission in Permission)
    ) {
      throw new HttpException('Invalid permission type', HttpStatus.BAD_REQUEST)
    }

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    if (project.user.id !== userLogged.userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    const userToShare = await this.userRepository.findOneBy({
      email: shareProjectDto.email
    })

    if (!userToShare) {
      throw new HttpException('User to share not found', HttpStatus.NOT_FOUND)
    }

    const existing = await this.projectUserRepository.findOne({
      where: {
        user: { email: shareProjectDto.email },
        project: { id: projectId }
      }
    })

    if (existing) {
      throw new HttpException(
        'User already has access to this project',
        HttpStatus.CONFLICT
      )
    }

    const projectUser = this.projectUserRepository.create({
      user: userToShare,
      project,
      permission: shareProjectDto.permission
    })

    await this.projectUserRepository.save(projectUser)

    return toProjectDto(project)
  }
  async findMembers(
    projectId: number,
    userLogged: UserLoggedDto
  ): Promise<MembersDto[]> {
    const project = await this.projectsRepository.findOne({
      where: [
        {
          id: projectId,
          user: { id: userLogged.userId }
        },
        {
          id: projectId,
          projectUsers: {
            user: { id: userLogged.userId }
          }
        }
      ],
      relations: ['user', 'projectUsers', 'projectUsers.user']
    })

    if (project.user.id !== userLogged.userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    const members = project.projectUsers.map(projectUser => ({
      id: projectUser.user.id,
      name: projectUser.user.name
    }))

    return members
  }

  async exit(
    projectId: number,
    userLogged: UserLoggedDto
  ): Promise<MembersDto[]> {
    const project = await this.projectsRepository.findOne({
      where: [
        {
          id: projectId,
          user: { id: userLogged.userId }
        },
        {
          id: projectId,
          projectUsers: {
            user: { id: userLogged.userId }
          }
        }
      ],
      relations: ['user', 'projectUsers', 'projectUsers.user']
    })

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    const isOwner = project.user.id === userLogged.userId

    if (isOwner) {
      throw new HttpException(
        'Project owner cannot exit the project',
        HttpStatus.FORBIDDEN
      )
    }

    const projectUser = await this.projectUserRepository.findOne({
      where: {
        project: { id: projectId },
        user: { id: userLogged.userId }
      }
    })

    if (!projectUser) {
      throw new HttpException(
        'User is not a member of this project',
        HttpStatus.NOT_FOUND
      )
    }

    await this.projectUserRepository.delete(projectUser.id)

    const updatedMembers = project.projectUsers
      .filter(pu => pu.user.id !== userLogged.userId)
      .map(pu => ({
        id: pu.user.id,
        name: pu.user.name
      }))

    return updatedMembers
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      relations: ['user']
    })
  }

  async findAllByUser(userLogged: UserLoggedDto): Promise<ProjectDto[]> {
    const projects = await this.projectsRepository.find({
      relations: ['user', 'projectUsers'],
      where: [
        {
          user: { id: userLogged.userId }
        },
        {
          projectUsers: {
            user: { id: userLogged.userId }
          }
        }
      ]
    })

    return projects.map(project => toProjectDto(project))
  }

  async findOne(userLogged: UserLoggedDto, id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: [
        {
          id,
          user: { id: userLogged.userId }
        },
        {
          id,
          projectUsers: {
            user: { id: userLogged.userId }
          }
        }
      ],
      relations: ['user', 'projectUsers']
    })

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    return project
  }

  async update(
    userLogged: UserLoggedDto,
    id: number,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto)
    return this.findOne(userLogged, id)
  }

  async delete(userLogged: UserLoggedDto, id: number): Promise<void> {
    const project = await this.findOne(userLogged, id)

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    await this.projectsRepository.delete(id)
  }
}

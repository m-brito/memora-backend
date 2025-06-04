// Entities
import { Project, ProjectUser } from '../entities'

// Utils
import { toUserDto } from 'src/modules/users/mappers'

// Types
import { ProjectDto, ProjectUserDto } from '../dtos'

export function toProjectDto(project: Project): ProjectDto {
  return {
    id: project.id,
    name: project.name,
    acronym: project.acronym,
    created_at: project.created_at,
    updated_at: project.updated_at,
    projectUsers: toProjectUserDto(project.projectUsers),
    user: toUserDto(project.user)
  }
}

export function toProjectUserDto(
  projectUsers: ProjectUser[]
): ProjectUserDto[] {
  return projectUsers?.map(user => {
    return { ...user, user: toUserDto(user.user) }
  })
}

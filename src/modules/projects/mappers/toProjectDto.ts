// Entities
import { Project } from '../entities'

// Utils
import { toUserDto } from 'src/modules/users/mappers'

// Types
import { ProjectDto } from '../dtos'

export function toProjectDto(project: Project): ProjectDto {
  return {
    id: project.id,
    name: project.name,
    acronym: project.acronym,
    created_at: project.created_at,
    updated_at: project.updated_at,
    user: toUserDto(project.user)
  }
}

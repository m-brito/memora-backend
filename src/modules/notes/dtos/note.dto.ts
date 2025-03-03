// Types
import { UserDto } from '@users/dtos/user.dto'
import { TypeDto } from '../../types/dtos/type.dto'
import { ProjectDto } from '@projects/dtos/project.dto'

export interface NoteDto {
  id: number
  text: string
  type: TypeDto
  user: UserDto
  project: ProjectDto
}

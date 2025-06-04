import { UserDto } from '@users/dtos/user.dto'

export class ProjectDto {
  id: number
  name?: string
  acronym?: string
  created_at: Date
  updated_at: Date
  user: UserDto
  projectUsers?: ProjectUserDto[]
}

export class ProjectUserDto {
  id: number
  user: UserDto
  permission: string
}

import { RoleDto } from '@roles/dtos/role.dto'

export class UserLoggedDto {
  userId: number
  email: string
  roles: RoleDto[]
}

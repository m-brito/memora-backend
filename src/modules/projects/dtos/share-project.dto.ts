export class ShareProjectDto {
  email: string
  permission: Permission
}

export enum Permission {
  WRITE = 'WRITE',
  READ = 'READ'
}

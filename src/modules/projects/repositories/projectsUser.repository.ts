// External Libraries
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

// Entities
import { ProjectUser } from '@projects/entities/project_user.entity'

@Injectable()
export class ProjectsUserRepository extends Repository<ProjectUser> {
  constructor(private readonly dataSource: DataSource) {
    super(ProjectUser, dataSource.createEntityManager())
  }
}

// External Libraries
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

// Entities
import { Project } from '../entities'

@Injectable()
export class ProjectsRepository extends Repository<Project> {
  constructor(private readonly dataSource: DataSource) {
    super(Project, dataSource.createEntityManager())
  }
}

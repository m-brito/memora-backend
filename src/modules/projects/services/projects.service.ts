// External Libraries
import { Injectable } from '@nestjs/common'

// Repositories
import { ProjectsRepository } from '../repositories'

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectsRepository) {}
}

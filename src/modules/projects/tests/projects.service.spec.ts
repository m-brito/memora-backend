// External Libraries
import { Test, TestingModule } from '@nestjs/testing'

// Services
import { ProjectsService } from '../services'

describe('ProjectsService', () => {
  let service: ProjectsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService]
    }).compile()

    service = module.get<ProjectsService>(ProjectsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

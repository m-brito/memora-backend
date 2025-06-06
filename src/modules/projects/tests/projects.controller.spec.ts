// External Libraries
import { ProjectsController } from '../controllers'
import { Test, TestingModule } from '@nestjs/testing'

describe('ProjectsController', () => {
  let controller: ProjectsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController]
    }).compile()

    controller = module.get<ProjectsController>(ProjectsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { FeedbacksController } from '../controllers'

describe('FeedbacksController', () => {
  let controller: FeedbacksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksController]
    }).compile()

    controller = module.get<FeedbacksController>(FeedbacksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

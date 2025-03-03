import { Test, TestingModule } from '@nestjs/testing'
import { TypesService } from '../services'

describe('TypesService', () => {
  let service: TypesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesService]
    }).compile()

    service = module.get<TypesService>(TypesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

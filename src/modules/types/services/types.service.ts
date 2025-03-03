// External Libraries
import { Type } from '../entities'
import { Injectable } from '@nestjs/common'

// Repositories
import { TypesRepository } from '../repositories'

// Types
import { CreateTypeDto } from '../dtos'

@Injectable()
export class TypesService {
  constructor(private readonly typeRepository: TypesRepository) {}

  create(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = this.typeRepository.create(createTypeDto)
    return this.typeRepository.save(type)
  }

  findAll(): Promise<Type[]> {
    return this.typeRepository.find()
  }

  findOne(id: number): Promise<Type> {
    return this.typeRepository.findOne({ where: { id } })
  }

  async update(id: number, updateTypeDto: CreateTypeDto): Promise<Type> {
    await this.typeRepository.update(id, updateTypeDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.typeRepository.delete(id)
  }
}

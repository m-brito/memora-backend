// External Libraries
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

// Entities
import { Type } from '../entities'

@Injectable()
export class TypesRepository extends Repository<Type> {
  constructor(private readonly dataSource: DataSource) {
    super(Type, dataSource.createEntityManager())
  }
}

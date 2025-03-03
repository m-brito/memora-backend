// External Libraries
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

// Entities
import { Feedback } from '../entities'

@Injectable()
export class FeedbacksRepository extends Repository<Feedback> {
  constructor(private readonly dataSource: DataSource) {
    super(Feedback, dataSource.createEntityManager())
  }
}

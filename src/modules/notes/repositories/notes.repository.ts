// External Libraries
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

// Entities
import { Note } from '../entities'

@Injectable()
export class NotesRepository extends Repository<Note> {
  constructor(private readonly dataSource: DataSource) {
    super(Note, dataSource.createEntityManager())
  }
}

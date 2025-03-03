// External Libraries
import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entities
import { Note } from './entities'

// Controllers
import { NotesController } from './controllers'

// Services
import { NotesService } from './services'

// Repositories
import { NotesRepository } from './repositories'

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [
    NotesService,
    {
      provide: NotesRepository,
      useFactory: (dataSource: DataSource) => new NotesRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [NotesController],
  exports: [NotesService, NotesRepository]
})
export class NotesModule {}

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

// Utils
import { UsersModule } from '../users/users.module'
import { TypesModule } from '../types/types.module'
import { ProjectsModule } from '../projects/projects.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    UsersModule,
    TypesModule,
    ProjectsModule
  ],
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

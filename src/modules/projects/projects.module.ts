// External Libraries
import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entities
import { Project } from './entities'

// Controllers
import { ProjectsController } from './controllers'

// Services
import { ProjectsService } from './services'

// Repositories
import { ProjectsRepository } from './repositories'

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [
    ProjectsService,
    {
      provide: ProjectsRepository,
      useFactory: (dataSource: DataSource) =>
        new ProjectsRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService, ProjectsRepository]
})
export class ProjectsModule {}

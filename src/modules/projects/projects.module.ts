// External Libraries
import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entities
import { Project, ProjectUser } from './entities'

// Controllers
import { ProjectsController } from './controllers'

// Services
import { ProjectsService } from './services'

// Repositories
import { ProjectsRepository, ProjectsUserRepository } from './repositories'

// Utils
import { UsersModule } from '../users/users.module'
@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectUser]), UsersModule],
  providers: [
    ProjectsService,
    {
      provide: ProjectsRepository,
      useFactory: (dataSource: DataSource) =>
        new ProjectsRepository(dataSource),
      inject: [DataSource]
    },
    {
      provide: ProjectsUserRepository,
      useFactory: (dataSource: DataSource) =>
        new ProjectsUserRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService, ProjectsRepository, ProjectsUserRepository]
})
export class ProjectsModule {}

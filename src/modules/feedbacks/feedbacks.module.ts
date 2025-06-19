// External Libraries
import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entities
import { Feedback } from './entities'

// Controllers
import { FeedbacksController } from './controllers'

// Services
import { FeedbacksService } from './services'

// Utils
import { UsersModule } from '../users/users.module'
import { ProjectsModule } from '../projects/projects.module'

// Repositories
import { FeedbacksRepository } from './repositories'

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]), UsersModule, ProjectsModule],
  providers: [
    FeedbacksService,
    {
      provide: FeedbacksRepository,
      useFactory: (dataSource: DataSource) =>
        new FeedbacksRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [FeedbacksController],
  exports: [FeedbacksService, FeedbacksRepository]
})
export class FeedbacksModule {}

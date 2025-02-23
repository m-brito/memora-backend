// External Libraries
import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entities
import { User } from './entities/user.entity'

// Controllers
import { UsersController } from './controllers/users.controller'

// Services
import { UsersService } from './services/users.service'

// Repositories
import { UsersRepository } from './repositories/users.repository'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useFactory: (dataSource: DataSource) => new UsersRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository]
})
export class UsersModule {}

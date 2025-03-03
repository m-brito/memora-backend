// External Libraries
import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entities
import { Role } from './entities'

// Controllers
import { RolesController } from './controllers'

// Services
import { RolesService } from './services/roles.service'

// Repositories
import { RolesRepository } from './repositories'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [
    RolesService,
    {
      provide: RolesRepository,
      useFactory: (dataSource: DataSource) => new RolesRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [RolesController],
  exports: [RolesService, RolesRepository]
})
export class RolesModule {}

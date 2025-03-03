// External Libraries
import { DataSource } from 'typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entities
import { Type } from './entities'

// Controlers
import { TypesController } from './controllers'

// Services
import { TypesService } from './services'

// Repositories
import { TypesRepository } from './repositories'

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  providers: [
    TypesService,
    {
      provide: TypesRepository,
      useFactory: (dataSource: DataSource) => new TypesRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [TypesController],
  exports: [TypesService, TypesRepository]
})
export class TypesModule {}

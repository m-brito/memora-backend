// External Libraries
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

// Modules
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { TypesModule } from './modules/types/types.module'
import { NotesModule } from './modules/notes/notes.module'
import { ProjectsModule } from './modules/projects/projects.module'
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module'
import { RolesService } from './modules/roles/services/roles.service'
import { RolesController } from './modules/roles/controllers/roles.controller'
import { RolesModule } from './modules/roles/roles.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // Tirar em prod
      ssl: false,
      logging: true
    }),
    AuthModule,
    UsersModule,
    NotesModule,
    TypesModule,
    RolesModule,
    ProjectsModule,
    FeedbacksModule
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class AppModule {}

// External Libraries
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

// Entites
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { ProjectsModule } from './modules/projects/projects.module'

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
    ProjectsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

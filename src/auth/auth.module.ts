// External Libraries
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

// Services
import { AuthService } from './services'

// Controllers
import { AuthController } from './controllers'

// Strategies
import { JwtStrategy } from './strategies'
import { LocalStrategy } from './strategies'

import { UsersModule } from 'src/modules/users/users.module'
import { UsersService } from '@users/services/users.service'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' }
      })
    })
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

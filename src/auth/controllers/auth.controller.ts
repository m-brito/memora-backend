// External Libraries
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common'

// Auth
import { LocalAuthGuard } from '../guards/auth.guard'

// Services
import { AuthService } from '../services/auth.service'
import { UsersService } from '@users/services/users.service'

// Types
import { CreateUserDto } from '@users/dtos/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}

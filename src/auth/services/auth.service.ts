/* eslint-disable @typescript-eslint/no-unused-vars */
// External Libraries
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

// Services
import { UsersService } from '@users/services/users.service'
import { UserDto } from '@users/dtos/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    const comparedPassword = await bcrypt.compare(password, user.password)

    if (user && comparedPassword) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: UserDto) {
    const payload = {
      sub: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

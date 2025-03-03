/* eslint-disable @typescript-eslint/no-unused-vars */
// External Libraries
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'

// Services
import { UsersService } from '@users/services/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(user: any) {
    const roles = user.roles.map(role => role.name)
    const payload = { sub: user.id, email: user.email, roles: roles }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

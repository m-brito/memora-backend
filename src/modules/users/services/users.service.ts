/* eslint-disable @typescript-eslint/no-unused-vars */
// External Libraries
import * as bcrypt from 'bcrypt'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

// Utils
import { toUserDto } from '../mappers/toUserDto'
import { PaginatedResult } from 'src/utils/types'

// Entities
import { User } from 'src/modules/users/entities/user.entity'

// Repositories
import { UsersRepository } from '@users/repositories/users.repository'

// Types
import { UserDto } from '@users/dtos/user.dto'
import { CreateUserDto } from '@users/dtos/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(
    page: number,
    limit: number
  ): Promise<PaginatedResult<UserDto>> {
    const skip = (page - 1) * limit
    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
      order: { created_at: 'DESC' }
    })

    return {
      data: users.map(user => toUserDto(user)),
      total,
      page,
      lastPage: Math.ceil(total / limit)
    }
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email }
    })
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt)

    const existingUser = await this.findByEmail(createUserDto.email)
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    })

    const newUser = await this.userRepository.save(user)
    return toUserDto(newUser)
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user)
    return this.findOne(id)
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    await this.userRepository.delete(id)
  }
}

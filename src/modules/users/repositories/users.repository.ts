// External Libraries
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

// Entities
import { User } from '../entities/user.entity'

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } })
  }
}

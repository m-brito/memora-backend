// External Libraries
import {
  Column,
  Entity,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Entities
import { User } from '@users/entities/user.entity'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToMany(() => User, user => user.roles)
  users: User[]
}

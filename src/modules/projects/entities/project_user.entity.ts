// External Libraries
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

// Entities
import { Project } from './project.entity'
import { User } from '@users/entities/user.entity'

@Entity('projects_users')
export class ProjectUser {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.projectUsers, {
    eager: true,
    onDelete: 'CASCADE'
  })
  user: User

  @ManyToOne(() => Project, project => project.projectUsers, {
    onDelete: 'CASCADE'
  })
  project: Project

  // WRITE/READ
  @Column()
  permission: string
}

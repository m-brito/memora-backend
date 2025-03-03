// External Libraries
import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Entities
import { User } from '@users/entities/user.entity'
import { Project } from 'src/modules/projects/entities'

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  text: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => User, user => user.sentFeedbacks, { onDelete: 'CASCADE' })
  sender: User

  @ManyToOne(() => User, user => user.receivedFeedbacks, {
    onDelete: 'CASCADE'
  })
  receiver: User

  @ManyToOne(() => Project, project => project.feedbacks, {
    onDelete: 'CASCADE'
  })
  project: Project
}

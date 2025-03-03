// External Libraries
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Entities
import { Note } from 'src/modules/notes/entities'
import { Project } from 'src/modules/projects/entities'
import { Feedback } from 'src/modules/feedbacks/entities'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Project, project => project.user)
  projects: Project[]

  @OneToMany(() => Note, note => note.user)
  notes: Note[]

  @OneToMany(() => Feedback, feedback => feedback.sender)
  sentFeedbacks: Feedback[]

  @OneToMany(() => Feedback, feedback => feedback.receiver)
  receivedFeedbacks: Feedback[]

  @Column({ default: 'USER' })
  role: string
}

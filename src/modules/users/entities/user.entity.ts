// External Libraries
import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable
} from 'typeorm'

// Entities
import { Note } from 'src/modules/notes/entities'
import { Role } from 'src/modules/roles/entities'
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

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[]
}

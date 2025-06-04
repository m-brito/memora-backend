// External Libraries
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Entities
import { Note } from 'src/modules/notes/entities'
import { User } from '@users/entities/user.entity'
import { Feedback } from 'src/modules/feedbacks/entities'
import { ProjectUser } from './project_user.entity'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string

  @Column({ length: 10, nullable: true })
  acronym: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne(() => User, user => user.projects, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL'
  })
  user: User

  @OneToMany(() => Note, note => note.project)
  notes: Note[]

  @OneToMany(() => Feedback, feedback => feedback.project)
  feedbacks: Feedback[]

  @OneToMany(() => ProjectUser, projectUser => projectUser.project, {})
  projectUsers: ProjectUser[]
}

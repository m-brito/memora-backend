// External Libraries
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

// Entities
import { Type } from 'src/modules/types/entities'
import { User } from '@users/entities/user.entity'
import { Project } from 'src/modules/projects/entities'

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'text' })
  text: string

  @ManyToOne(() => Type, type => type.notes, {
    eager: true,
    onDelete: 'CASCADE'
  })
  type: Type

  @ManyToOne(() => Project, project => project.notes, {
    eager: true,
    onDelete: 'CASCADE'
  })
  project: Project

  @ManyToOne(() => User, user => user.notes, {
    eager: true,
    onDelete: 'CASCADE'
  })
  user: User
}

// External Libraries
import {
  Column,
  Entity,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Entities
import { Note } from 'src/modules/notes/entities'

@Entity('types')
export class Type {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Note, note => note.type)
  notes: Note[]
}

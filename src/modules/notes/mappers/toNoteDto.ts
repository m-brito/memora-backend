// Entities
import { Note } from '../entities'

// Utils
import { toUserDto } from 'src/modules/users/mappers'
import { toTypeDto } from 'src/modules/types/mappers/toTypeDto'
import { toProjectDto } from 'src/modules/projects/mappers/toProjectDto'

// Types
import { NoteDto } from '@notes/dtos/note.dto'

export function toNoteDto(note: Note): NoteDto {
  return {
    id: note.id,
    project: toProjectDto(note.project),
    text: note.text,
    textMarkdown: note.textMarkdown,
    type: toTypeDto(note.type),
    user: toUserDto(note.user)
  }
}

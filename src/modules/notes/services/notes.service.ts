// External Libraries
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

// Entities
import { Note } from '../entities'

// Repositories
import { NotesRepository } from '../repositories'
import { UsersRepository } from '@users/repositories/users.repository'
import { TypesRepository } from '../../types/repositories/types.repository'
import { ProjectsRepository } from '@projects/repositories/projects.repository'

// Utils
import { toNoteDto } from '../mappers'

// Types
import { CreateNoteDto } from '../dtos'
import { UserLoggedDto } from 'src/auth/dto'
import { NoteDto } from '@notes/dtos/note.dto'

@Injectable()
export class NotesService {
  constructor(
    private readonly noteRepository: NotesRepository,
    private readonly userRepository: UsersRepository,
    private readonly typeRepository: TypesRepository,
    private readonly projectRepository: ProjectsRepository
  ) {}

  async create(
    userLogged: UserLoggedDto,
    createNoteDto: CreateNoteDto
  ): Promise<Note> {
    const idLogged = userLogged.userId

    const [user, project, type] = await Promise.all([
      this.userRepository.findOneBy({ id: idLogged }),
      this.projectRepository.findOneBy({ id: createNoteDto.projectId }),
      this.typeRepository.findOneBy({ id: createNoteDto.typeId })
    ])

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    if (!type) throw new HttpException('Type not found', HttpStatus.NOT_FOUND)

    let note = new Note()
    note = {
      ...createNoteDto,
      text: '',
      textMarkdown: '',
      user,
      project,
      type
    }

    const newNote = this.noteRepository.create(note)
    return this.noteRepository.save(newNote)
  }

  async findAll(): Promise<NoteDto[]> {
    const notes = await this.noteRepository.find({
      relations: ['user', 'project', 'type']
    })
    const allNotes = notes.map(note => toNoteDto(note))
    return allNotes
  }

  async findOne(id: number): Promise<NoteDto> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['user', 'project', 'type']
    })
    return toNoteDto(note)
  }

  async findByProject(
    userLogged: UserLoggedDto,
    projectId: number
  ): Promise<NoteDto[]> {
    const notes = await this.noteRepository.find({
      relations: ['user', 'project', 'type'],
      where: {
        project: { id: projectId }
      }
    })
    const allNotes = notes.map(note => toNoteDto(note))
    return allNotes
  }

  async update(
    id: number,
    userLogged: UserLoggedDto,
    updateNoteDto: CreateNoteDto
  ): Promise<NoteDto> {
    const idLogged = userLogged.userId

    const [user, project, type] = await Promise.all([
      this.userRepository.findOneBy({ id: idLogged }),
      this.typeRepository.findOneBy({ id: updateNoteDto.typeId }),
      this.projectRepository.findOneBy({ id: updateNoteDto.projectId })
    ])

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    if (!type) throw new HttpException('Type not found', HttpStatus.NOT_FOUND)
    const newNote = {
      user: user,
      text: updateNoteDto.text,
      textMarkdown: updateNoteDto.textMarkdown,
      type: type,
      project: project
    }
    await this.noteRepository.update(id, newNote)
    const note = await this.noteRepository.findOne({ where: { id } })
    return toNoteDto(note)
  }

  async patchUpdate(
    id: number,
    userLogged: UserLoggedDto,
    updateNoteDto: Partial<CreateNoteDto>
  ): Promise<NoteDto> {
    const idLogged = userLogged.userId

    const [user, project, type, note] = await Promise.all([
      this.userRepository.findOneBy({ id: idLogged }),
      this.projectRepository.findOneBy({ id: updateNoteDto.projectId }),
      this.typeRepository.findOneBy({ id: updateNoteDto.typeId }),
      this.noteRepository.findOne({ where: { id } })
    ])

    if (!note) throw new HttpException('Note not found', HttpStatus.NOT_FOUND)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    if (!project)
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    if (!type) throw new HttpException('Type not found', HttpStatus.NOT_FOUND)

    const updatedNote = {
      ...note,
      text: updateNoteDto.text ?? note.text,
      textMarkdown: updateNoteDto.textMarkdown ?? note.textMarkdown,
      type: type ?? note.type,
      project: project ?? note.project
    }

    await this.noteRepository.update(id, updatedNote)

    const savedNote = await this.noteRepository.findOne({ where: { id } })
    return toNoteDto(savedNote)
  }

  async remove(id: number): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id } })
    if (!note) throw new HttpException('Note not found', HttpStatus.NOT_FOUND)

    await this.noteRepository.delete(id)
  }
}

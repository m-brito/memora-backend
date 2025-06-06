// External Libraries
import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
  Patch
} from '@nestjs/common'

// Utils
import { CurrentUser, withAuthentication } from 'src/auth/decorators'
import { JwtAuthGuard, WithAuthenticationGuard } from 'src/auth/guards'

// Services
import { NotesService } from '../services'

// Types
import { CreateNoteDto } from '../dtos'
import { UserLoggedDto } from 'src/auth/dto'

@Controller('notes')
@UseGuards(JwtAuthGuard, WithAuthenticationGuard)
@withAuthentication('ADMIN', 'USER')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @CurrentUser() user: UserLoggedDto
  ) {
    return this.notesService.create(user, createNoteDto)
  }

  @Get()
  @withAuthentication('ADMIN')
  findAll() {
    return this.notesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notesService.findOne(id)
  }

  @Get('project/:projectId')
  @withAuthentication('ADMIN', 'USER')
  findByProject(
    @CurrentUser() user: UserLoggedDto,
    @Param('projectId') projectId: number
  ) {
    return this.notesService.findByProject(user, projectId)
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateNoteDto: CreateNoteDto,
    @CurrentUser() user: UserLoggedDto
  ) {
    return this.notesService.update(id, user, updateNoteDto)
  }

  @Patch(':id')
  patchUpdate(
    @Param('id') id: number,
    @Body() updateNoteDto: Partial<CreateNoteDto>,
    @CurrentUser() user: UserLoggedDto
  ) {
    return this.notesService.patchUpdate(id, user, updateNoteDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notesService.remove(id)
  }
}

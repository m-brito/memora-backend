// External Libraries
import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller
} from '@nestjs/common'

// Utils
import { JwtAuthGuard, WithAuthenticationGuard } from 'src/auth/guards'
import { withAuthentication } from 'src/auth/decorators'

// Services
import { TypesService } from '../services'

// Types
import { CreateTypeDto } from '../dtos'

@Controller('types')
@UseGuards(JwtAuthGuard, WithAuthenticationGuard)
@withAuthentication('ADMIN')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto)
  }

  @Get()
  findAll() {
    return this.typesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTypeDto: CreateTypeDto) {
    return this.typesService.update(id, updateTypeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.typesService.remove(id)
  }
}

// External Libraries
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

// Services
import { FeedbacksService } from '../services'

// Decorators
import { CurrentUser, withAuthentication } from 'src/auth/decorators'

// Types
import { CreateFeedbackDto } from '../dtos'
import { UserLoggedDto } from 'src/auth/dto'
import { JwtAuthGuard, WithAuthenticationGuard } from 'src/auth/guards'
import { Feedback } from '../entities'

@Controller('feedbacks')
@UseGuards(JwtAuthGuard, WithAuthenticationGuard)
@withAuthentication('ADMIN', 'USER')
export class FeedbacksController {
  constructor(private readonly feedbackService: FeedbacksService) {}

  @Post()
  async create(
    @CurrentUser() user: UserLoggedDto,
    @Body() createFeedbackDto: CreateFeedbackDto
  ): Promise<void> {
    return this.feedbackService.create(user, createFeedbackDto)
  }

  @Get()
  async getMyFeedbacks(
    @CurrentUser() user: UserLoggedDto
  ): Promise<Feedback[]> {
    return this.feedbackService.getMyFeedbacks(user)
  }
}

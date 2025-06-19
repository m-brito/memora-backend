// External Libraries
import { Injectable } from '@nestjs/common'

// Repositories
import { FeedbacksRepository } from '../repositories'
import { UsersRepository } from '@users/repositories/users.repository'
import { ProjectsRepository } from '@projects/repositories/projects.repository'

// Entities
import { Feedback } from '../entities'

// Types
import { CreateFeedbackDto } from '../dtos'
import { UserLoggedDto } from 'src/auth/dto'

@Injectable()
export class FeedbacksService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly userRepository: UsersRepository,
    private readonly projectRepository: ProjectsRepository
  ) {}

  async create(
    userLogged: UserLoggedDto,
    createFeedbackDto: CreateFeedbackDto
  ): Promise<void> {
    const [receiver, sender, project] = await Promise.all([
      this.userRepository.findOneBy({ id: createFeedbackDto.receiverId }),
      this.userRepository.findOneBy({ id: userLogged.userId }),
      this.projectRepository.findOneBy({ id: createFeedbackDto.projectId })
    ])

    if (!receiver) throw new Error('Receiver not found')
    if (!project) throw new Error('Project not found')
    if (!sender && !createFeedbackDto.anonymous) {
      throw new Error('Sender not found')
    }

    const newFeedback = new Feedback()
    newFeedback.receiver = receiver
    newFeedback.created_at = new Date()
    newFeedback.text = createFeedbackDto.text
    newFeedback.sender = !createFeedbackDto.anonymous ? sender : null
    newFeedback.project = project

    const feedback = this.feedbacksRepository.create(newFeedback)

    await this.feedbacksRepository.save(feedback)
  }

  async getMyFeedbacks(userLogged: UserLoggedDto): Promise<Feedback[]> {
    const user = await this.userRepository.findOneBy({ id: userLogged.userId })

    if (!user) throw new Error('User not found')

    return this.feedbacksRepository.find({
      where: { receiver: { id: user.id } },
      order: { created_at: 'DESC' },
      relations: ['sender', 'project']
    })
  }
}

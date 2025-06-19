export interface CreateFeedbackDto {
  text: string
  projectId: number
  receiverId: number
  anonymous?: boolean
}

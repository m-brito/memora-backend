import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { ValidationError } from 'class-validator'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    let status: number
    let message: any

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse()

      if (typeof errorResponse === 'object' && errorResponse !== null) {
        // Handling structured error responses (e.g., validation errors)
        message = errorResponse['message'] || errorResponse
      } else {
        message = errorResponse
      }
    } else if (exception instanceof ValidationError) {
      status = HttpStatus.BAD_REQUEST
      message = this.formatValidationErrors(exception)
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      message = 'An unexpected error occurred.'
    }

    response.status(status).json({
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message
    })
  }

  private formatValidationErrors(exception: ValidationError): any {
    return exception.constraints
      ? Object.values(exception.constraints)
      : exception.children?.map(this.formatValidationErrors.bind(this))
  }
}

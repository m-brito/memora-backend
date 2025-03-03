// External Libraries
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

// Utils
import { AUTH_KEY } from '../decorators'

@Injectable()
export class WithAuthenticationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    const hasRole = requiredRoles.includes(user.role.toUpperCase())
    if (!hasRole) {
      throw new ForbiddenException('Access denied: Insufficient permissions')
    }

    return true
  }
}

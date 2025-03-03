// External Libraries
import { SetMetadata } from '@nestjs/common'

// Constants
export const AUTH_KEY = 'withAuthentication'

// Functions
export function withAuthentication(...roles: string[]) {
  return SetMetadata(AUTH_KEY, roles)
}

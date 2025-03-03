import { Type } from '../entities'
import { TypeDto } from '../../types/dtos/type.dto'

export function toTypeDto(type: Type): TypeDto {
  return {
    id: type.id,
    name: type.name,
    updated_at: type.updated_at,
    created_at: type.created_at
  }
}

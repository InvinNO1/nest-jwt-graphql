import { SetMetadata } from '@nestjs/common'

export const Public = () => SetMetadata('isPublic', true)

export const Role = (...roles) => SetMetadata('Roles', roles)

import { Context, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { User } from './user.service'
import { AuthGuard } from '../auth/jwt-auth.guard'

@Resolver('User')
export class UserResolver {
  constructor() {}

  @Query()
  @UseGuards(AuthGuard)
  me(@Context('user') user: User) {
    return user
  }
}

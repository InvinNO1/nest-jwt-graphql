import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { User, UserService } from './user.service'
import { AuthGuard } from '../auth/jwt-auth.guard'

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  @UseGuards(AuthGuard)
  me(@Context('user') user: User) {
    return user
  }

  @Mutation()
  async login(@Args('email') email: string) {
    const user = await this.userService.getUserByEmail(email)
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.userService.createToken(user)
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Resolver('Auth')
export class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation()
  async login(@Args('email') email: string) {
    const user = await this.userService.getUserByEmail(email)
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.userService.createToken(user)
  }
}

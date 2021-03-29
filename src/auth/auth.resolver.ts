import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { LoginInput } from './dto/login.input'
import { LoginOutput } from './dto/login.output'
import { AuthService } from './auth.service'
import { Public } from '../common/decorator/auth.decorator'

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => LoginOutput)
  login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    return this.authService.login(input)
  }
}

import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthenticationError } from 'apollo-server-core'
import { JWT_SECRET } from '../common/constants'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    })
  }

  // Documentation for this here: https://www.npmjs.com/package/passport-jwt
  async validate(payload: { user: { id: number } }) {
    const userId = payload.user.id
    const user = await this.userService.findOne(userId)

    if (!user) {
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      )
    }

    return user
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { UserService } from '../user/user.service'
// import { JwtService } from '@nestjs/jwt'
import { LoginInput } from './dto/login.input'
import { LoginOutput } from './dto/login.output'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userService.findByUsername(input.username)
    if (!user || compareSync(input.password, user.password)) {
      throw new UnauthorizedException()
    }

    const payload = {
      user: {
        id: user.id,
        lastUpdate: user.updatedAt,
      },
    }
    return {
      token: this.jwtService.sign(payload),
      user: user,
    }
  }
}

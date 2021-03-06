import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthResolver } from './auth.resolver'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../common/constants'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN,
      },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [],
})
export class AuthModule {}

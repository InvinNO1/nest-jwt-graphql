import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthResolver } from './auth.resolver'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthResolver, UserService],
  exports: [],
})
export class AuthModule {}

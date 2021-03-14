import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants'
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, JwtModule],
})
export class UserModule {}

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      context: ({ req }) => ({ headers: req.headers }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { UserModule } from './user/user.module'
import database from './database'
import { AuthModule } from './auth/auth.module'
import { GraphQLError } from 'graphql'
import { CustomEntitySubscriber } from './util/entity-subscriber'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      formatError: (error: GraphQLError) => ({
        message:
          error.extensions?.exception?.response?.message || error.message,
        code: error.extensions?.code,
      }),
    }),
    ...database,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomEntitySubscriber],
})
export class AppModule {}

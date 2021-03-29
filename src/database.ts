import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {
  DB_DATABASE,
  DB_HOST,
  DB_LOGGING,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA,
  DB_USERNAME,
} from './common/constants'

export default [
  TypeOrmModule.forRootAsync({
    name: 'default',
    useFactory: () => {
      return {
        type: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        schema: DB_SCHEMA,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: DB_LOGGING,
        autoLoadEntities: false,
        namingStrategy: new SnakeNamingStrategy(),
      }
    },
  }),
]

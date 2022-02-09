import './pre.start'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { APP_PORT, LOG_LEVEL } from './constants'
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked'

declare const module: any

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule, {
    logger: LOG_LEVEL,
  })
  await app.listen(APP_PORT)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap().then(() => console.log('SERVER STARTED !', new Date()))

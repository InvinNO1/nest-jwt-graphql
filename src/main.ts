import './pre.start'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { APP_PORT } from './common/constants'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  await app.listen(APP_PORT)
}
bootstrap()

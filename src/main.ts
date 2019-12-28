import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/v1/api')
  const configService = app.get(ConfigService)

  await app.listen(configService.get<number>('PORT'), () => {
    console.log(`Server started at port: ${configService.get<number>('PORT')}`)
  })
}
bootstrap()

// External Libraries
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

// import { AllExceptionsFilter } from './shareds/filters/all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()

  if (process.env.VERCEL) {
    const server = await app.listen(3000)
    return server
  } else {
    await app.listen(process.env.PORT ?? 3000)
  }
}

export default bootstrap()

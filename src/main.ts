import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	await app.listen(8000)

	const configSwagger = new DocumentBuilder()
		.setTitle('Expenses Income Crm')
		.setVersion('1.0')
		.addTag('Auth')
		.addTag('User')
		.addTag('Actor')
		.build()

	const documentSwagger = SwaggerModule.createDocument(app, configSwagger)
	SwaggerModule.setup('api/docs', app, documentSwagger)
}
bootstrap()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    const configService = app.get(ConfigService);
    await app.listen(configService.get<number>('app.port'));
}
bootstrap();

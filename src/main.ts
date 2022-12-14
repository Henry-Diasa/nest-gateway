import {
  VersioningType,
  VERSION_NEUTRAL,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';
import fastifyCookie from '@fastify/cookie';
import { FastifyLogger } from './common/logger';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: FastifyLogger,
    }),
  );
  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });
  // 接口版本管理
  app.enableVersioning({
    // VERSION_NEUTRAL 有些控制器不需要版本控制
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });
  // 接口信息返回格式化
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常捕获
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter()); // 注意顺序
  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());
  // 创建文档
  generateDocument(app);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}
bootstrap();

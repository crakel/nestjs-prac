import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

// 로그의 종류
// log - 중요한 정보의 범용 로깅
// warning - 치명적이거나 파괴적이지 않은 처리되지 않은 문제
// error - 치명적이거나 파괴적인 처리되지 않은 문제
// debug - 오류 발생시 로직을 디버그하는 데 도움이되는 유용한 정보
// verbose - 응용 프로그램의 동작에 대한 통찰력 제공
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();

import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

// Module 이란?
// 모듈은 @Module () 데코레이터로 주석이 달린 클래스.
// @Module () 데코레이터는 Nest가 애플리케이션 구조를 구성하는 데 사용하는 메타 데이터 제공

// Provider를 사용하기 위해서는 Module에서 등록해야함
@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}

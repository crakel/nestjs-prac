import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

// Handler 란?
// 핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식 된 컨트롤러 클래스 내의 단순한 메서드

@Controller('boards')
export class BoardsController {
  // boardsService: BoardsService; // Parameter 정의 -> private 접근제한자를 통해 자동으로 암묵적인 property로 선언됨

  constructor(private boardsService: BoardsService) {}
  // Service를 type으로 지정
  @Get()
  getAllBoard() {
    return this.boardsService.getAllBoards();
  }
}

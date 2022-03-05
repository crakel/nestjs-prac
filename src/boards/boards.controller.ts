import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

// Handler 란?
// 핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식 된 컨트롤러 클래스 내의 단순한 메서드

// 클라이언트에서 요청을 보내면 먼저 컨트롤러로 가며 컨트롤러에서 알맞은 요청 경로에
// 라우팅해서 해당 핸들러로 가게 해줌. 그 후 요청 처리를 위해 서비스로 이동
// 서비스에서 로직을 처리해준후 서비스->컨트롤러 리턴값 컨트롤러->클라이언트 결과값
@Controller('boards') // 라우팅 경로 localhost:port/boards
export class BoardsController {
  // boardsService: BoardsService; // Parameter 정의 -> private 접근제한자를 통해 자동으로 암묵적인 property로 선언됨

  constructor(private boardsService: BoardsService) {}
  // Service를 type으로 지정
  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  // Nest는 @Body body를 이용해 req의 보내온 값을 가져올 수 있다
  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
}

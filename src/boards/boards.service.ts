import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { Board } from './boards.entity';
import { User } from 'src/auth/user.entity';

// Service 란?
// DB 관련된 로직을 처리.
// DB에서 데이터를 가져오거나 DB안에 게시판 생성할때 그 생성한 게시판 정보를 넣어주는 등의 로직처리

// Service를 Controller에서 이용하려면 Dependency Injection 필요 (Controller 클래스 Constructor 안에서)

// Provider 란?
// Provider는 Nest의 기본 개념. 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼등 Provider로 취급가능
// Provider는 종속성으로 주입할 수 있다. 즉, 객체는 서로 다양한 관계를 만들 수 있으며
// 객체의 인스터스를 "연결"하는 기능은 대부분 Nest 런타임 시슽메에 위임될 수 있다.

// typeOrm 에서 findeONe 메소드 기본 제공
// async await을 이용해서 DB 작업이 끝난 후 결과 값을 받음

// create
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board'); // board == table name

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();
    return boards;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException("Can't find Board with id");
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log('result', result);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}

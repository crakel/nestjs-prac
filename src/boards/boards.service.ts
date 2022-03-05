import { Injectable } from '@nestjs/common';

// Service 란?
// DB 관련된 로직을 처리.
// DB에서 데이터를 가져오거나 DB안에 게시판 생성할때 그 생성한 게시판 정보를 넣어주는 등의 로직처리

// Service를 Controller에서 이용하려면 Dependency Injection 필요 (Controller 클래스 Constructor 안에서)

// Provider 란?
// Provider는 Nest의 기본 개념. 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼등 Provider로 취급가능
// Provider는 종속성으로 주입할수 있다. 즉, 객체는 서로 다양한 관계를 만들 수 있으며
// 객체의 인스터스를 "연결"하는 기능은 대부분 Nest 런타임 시슽메에 위임될 수 있다.

@Injectable()
export class BoardsService {
  private boards = [];

  getAllBoards() {
    return this.boards;
  }
}

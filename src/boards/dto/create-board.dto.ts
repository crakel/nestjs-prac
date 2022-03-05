import { IsNotEmpty } from 'class-validator'; // pipe를 통한 유효성 체크
// DTO란?
// 계층간 데이터 교환을 위한 객체
// DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체
// DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체
// interface나 class를 이용해서 정의

// DTO를 쓰는 이유
// 데이터 유효성을 체크하는데 효율적
// 더 안정적인 코드, ts의 type으로도 사용

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

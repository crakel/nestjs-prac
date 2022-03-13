import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  // class-validator를 이용한 dto 유효성 정의 -> ValidationPipe 통해 체크
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}

import { AuthCredentialsDto } from './dto/auth-credential.dto';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

// Nest 미들웨어 -> Pipes, Filters, Guards, Interceptors
// Pipes : 요청 유효성 검사 및 페이로드 변환
// Filters : 오류처리 미들웨어
// Guards : 인증 미들웨어
// Interceptors : 응답 매핑 및 캐시 관리, 요청 로깅
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: User) {
    // 커스텀 데코레이터 GetUser 사용
    console.log('user', user);
  }
}

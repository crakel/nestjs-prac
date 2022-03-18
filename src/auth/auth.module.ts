import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // 유저를 인증하기 위해 사용할 기본 strategy를 명시, 여기는 jwt
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // jwt 인증 부분을 담당, 그리고 주로 sign() 을 위한 부분.
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  // JwtStrategy를 이 Auth 모듈에서 사용할수있게 등록
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

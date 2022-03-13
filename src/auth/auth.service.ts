import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authbCredentailsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authbCredentailsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.validateUserPassword(email, password);
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({ id: user.id }),
      user: user,
    };
  }
}

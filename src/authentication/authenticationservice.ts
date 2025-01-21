import { Injectable, NotFoundException } from '@nestjs/common';
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

  async loginAs(id: number) {
    const user = await this.usersService.findOne(id);

    if(!user)
      throw new NotFoundException('User not found')

    return this.login(user);
  }
}

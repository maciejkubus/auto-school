import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateAndGetUser(email: string, password: string) {
    const validated = await this.usersService.validateUserPassword(email, password);
    if(validated)
      return await this.usersService.findOneByEmail(email)
    else
      throw new ForbiddenException("E-mail doesn't match password.")
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({ id: user.id, email: user.email }),
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

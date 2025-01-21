import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password-dto';
import { User } from './entities/user.entity';
import { UserType } from './enums/user-types.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    const newUser = new User();
    newUser.password = user.password;
    newUser.email = user.email;
    newUser.type = user.type;
    return await this.userRepository.save(newUser);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id }
    })

    if(!user)
      throw new NotFoundException('User not found')

    return user;
  }

  async update(id: number, user: Partial<User>) {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async changePassword(id: number, data: ChangePasswordDto) {
    const user = await await this.userRepository.findOne({
      select: ['id', 'password', 'email'],
      where: { id },
    });
    const validated = await this.validateUserPassword(
      user.email,
      data.currentPassword,
    );
    if (!validated) throw new ForbiddenException('Invalid password');
    user.hashPassword(data.newPassword);
    return await this.userRepository.update(id, user);
  }

  async validateUserPassword(email: string, password: string) {
    const user = await await this.userRepository.findOne({
      select: ['password', 'email'],
      where: { email },
    });
    return user && compareSync(password, user.password);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async isType(id: number, type: UserType) {
    const user = await this.findOne(id);
    return user.type == type;
  }
}

import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
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

  async create(userData: Partial<User>) {
    const existingUser = await this.findOneByEmail(userData.email);
    
    if(existingUser)
      throw new BadRequestException('Email already exist');

    const newUser = new User();
    newUser.password = userData.password;
    newUser.email = userData.email;
    newUser.type = userData.type;
    const user = await this.create(userData);
    user.hashPassword(userData.password);
    return await this.update(user.id, user);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id }
    })
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email }
    })
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
    throw new ForbiddenException('User cannot be deleted');
    await this.userRepository.delete(id);
  }

  async isType(id: number, type: UserType) {
    const user = await this.findOne(id);
    return user.type == type;
  }

  async archiveUser(id: number) {
    const user = await this.findOne(id);
    const date = new Date();
    user.archived = date;
    return await this.userRepository.save(user);
  }
}

import { BadRequestException, ConflictException, ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { SchoolsService } from 'src/schools/schools.service';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password-dto';
import { User } from './entities/user.entity';
import { UserType } from './enums/user-types.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject(forwardRef(() => SchoolsService))
    private schoolService: SchoolsService,
  ) {}

  async create(userData: Partial<User>) {
    const existingUser = await this.findOneByEmail(userData.email);
    
    if(existingUser)
      throw new BadRequestException('Email already exist');

    const newUser = new User();
    newUser.password = userData.password;
    newUser.email = userData.email;
    newUser.type = userData.type;

    if(userData.school) {
      const school = await this.schoolService.create(userData.school);
      newUser.school = school;
    }

    const user = await this.userRepository.save(newUser);
    user.hashPassword(userData.password);
    return await this.update(user.id, user);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      relations: ['school'],
      where: { id }
    })
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      relations: ['school'],
      where: { email }
    })
  }

  async update(id: number, user: Partial<User>) {
    const userByEmail = await this.findOneByEmail(user.email);
    if(userByEmail && userByEmail.id != id) {
      throw new ConflictException('E-mail is used by another user.')
    }

    await this.userRepository.update(id, user);
    return await this.findOne(id);
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
    await this.userRepository.update(id, user);
    return await this.findOne(id);
  }

  async validateUserPassword(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['password', 'email'],
      where: { email },
    });
    const validated: boolean = !!user && compareSync(password, user.password);
    return validated;
  }

  async remove(id: number) {
    throw new ForbiddenException('User cannot be deleted');
    await this.userRepository.delete(id);
  }

  async isType(id: number, type: UserType, allowAdmin = false) {
    const user = await this.findOne(id);
    return user.type == type || (allowAdmin && user.type == UserType.ADMIN);
  }

  async archiveUser(id: number) {
    const user = await this.findOne(id);
    const date = new Date();
    user.archived = date;
    return await this.userRepository.save(user);
  }
}

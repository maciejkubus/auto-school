import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LessonTypeDto } from './dto/lesson-type-dto';
import { LessonTypeUpdateDto } from './dto/lesson-type-update-dto';
import { LessonType } from './entity/lesson-type.entity';

@Injectable()
export class LessonTypesService {
  constructor(
    @Inject('LESSON_TYPES_REPOSITORY')
      private lessonTypesRepository: Repository<LessonType>,
    @Inject(SchoolsService)
    private schoolsService: SchoolsService,
    @Inject(UsersService)
    private usersService: UsersService
  ) {}


  async create(data: LessonTypeDto, userId: number) {
    const school = await this.usersService.findUserSchool(userId);
    if(!school) throw new NotFoundException('School not found.');

    const lessonType = new LessonType();
    lessonType.name = data.name;
    lessonType.description = data.description;
    lessonType.school = school;
    await this.lessonTypesRepository.save(lessonType);

    return lessonType;
  }

  async find(id: number) {
    return await this.lessonTypesRepository.findOne({
      where: { id }
    })
  }

  async findBySchool(schoolId: number) {
    return await this.lessonTypesRepository.find({
      relations: ['school'],
      where: { school: { id: schoolId } }
    })
  }

  async findAtUserSchool(userId: number) {
    const school = await this.usersService.findUserSchool(userId);
    return await this.findBySchool(school.id);
  }

  async update(lessonTypeId: number, data: LessonTypeUpdateDto) {
    await this.lessonTypesRepository.update(lessonTypeId, data);
    return await this.find(lessonTypeId);
  }
}

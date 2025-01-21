import { Inject, Injectable } from '@nestjs/common';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Test } from './entity/test.entity';

@Injectable()
export class TestsService {
  constructor(
    @Inject('TEST_REPOSITORY') private testRepository: Repository<Test>,
    @Inject(SchoolsService)
    private schoolService: SchoolsService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  async create(data: Partial<Test>, userId: number) {
    const school = await this.schoolService.findByUser(userId);

    const test = new Test();
    test.name = data.name;
    test.maxPoints = data.maxPoints;
    test.pointsToPass = data.pointsToPass;
    test.school = school;
    await this.testRepository.save(test);

    return test;
  }

  async findOne(id: number, relations: string[] = []) {
    return await this.testRepository.findOne({
      relations,
      where: { id }
    })
  }

  async findAllBySchoolId(schoolId: number) {
    return await this.testRepository.find({
      relations: ['school'],
      where: { school: { id: schoolId } }
    })
  }

  async findAllByUserId(userId: number) {
    const school = await this.schoolService.findByUser(userId);
    const tests = await this.findAllBySchoolId(school.id);
    return tests.map(test => {
      delete test.school;
      return test;
    })
  }

  async doesTestBelongToUser(testId: number, userId: number) {
    const test = await this.findOne(testId, ['school']);
    const school = await this.schoolService.findByUser(userId);
    return test.school.id == school.id;
  }

  async update(testId: number, data: Partial<Test>) {
    await this.testRepository.update(testId, data);
    return await this.findOne(testId);
  }
}

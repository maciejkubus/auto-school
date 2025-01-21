import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InstructorsService } from 'src/instructors/instructors.service';
import { SchoolsService } from 'src/schools/schools.service';
import { StudentsService } from 'src/students/students.service';
import { TestsService } from 'src/tests/tests.service';
import { Repository } from 'typeorm';
import { TestAppoimentDto } from './dto/test-appoiment-dto';
import { TestAppoimentUpdateDto } from './dto/test-appoiment-update-dto';
import { TestAppoiment } from './entities/TestAppoiment.entity';

@Injectable()
export class TestAppoimentsService {
  constructor(
    @Inject('TEST_APPOIMENT_REPOSITORY') private testAppoimentRepository: Repository<TestAppoiment>,
    @Inject(TestsService) private testsService: TestsService,
    @Inject(StudentsService) private studentsService: StudentsService,
    @Inject(InstructorsService) private instructorsService: InstructorsService,
    @Inject(SchoolsService) private schoolsService: SchoolsService,
  ){}

  async create(data: TestAppoimentDto, userId: number) {
    const school = await this.schoolsService.findByUser(userId);
    const test = await this.testsService.findOne(data.test.id, ['school']);
    const student = await this.studentsService.findOne(data.student.id, true);
    const instructor = await this.instructorsService.findOne(data.instructor.id, true);

    if(!(
      (school.id == test.school.id) && 
      (test.school.id == student.school.id) && 
      (student.school.id == instructor.school.id)
    ))
      throw new BadRequestException('Test, student and instructor must be from same school.');

    const appoiment = new TestAppoiment();
    appoiment.finish = new Date(data.finish);
    appoiment.note = data.note;
    appoiment.points = data.points;
    appoiment.start = new Date(data.start);
    appoiment.status = data.status;
    appoiment.test = test;
    appoiment.student = student;
    appoiment.instructor = instructor;
    await this.testAppoimentRepository.save(appoiment);

    return appoiment;
  }

  async findOne(appoimentId: number, relations: string[] = []) {
    return await this.testAppoimentRepository.findOne({
      relations,
      where: { id: appoimentId }
    })
  }

  async find(where: any, relations: string[] = []) {
    return await this.testAppoimentRepository.find({
      where,
      relations,
    })
  }

  async findAllInSchool(userId: number) {
    const school = await this.schoolsService.findByUser(userId);
    return await this.find({ test: { school: { id: school.id} } }, ['student', 'test', 'instructor', 'test.school'])
  }

  async update(appoimentId: number, data: TestAppoimentUpdateDto) {
    await this.testAppoimentRepository.update(appoimentId, data);
    return await this.findOne(appoimentId);
  }

  async doesAppoimentBelongToUser(appoimentId: number, userId: number) {
    const appoiment = await this.findOne(appoimentId, ['school', 'test']);
    const test = await this.testsService.findOne(appoiment.test.id, ['school'])
    const school = await this.schoolsService.findByUser(userId);
    return test.school.id == school.id;
  }
}

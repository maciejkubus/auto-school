import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InstructorsService } from 'src/instructors/instructors.service';
import { LessonTypesService } from 'src/lesson-types/lesson-types.service';
import { StudentsService } from 'src/students/students.service';
import { TimeSlotsService } from 'src/time-slots/time-slots.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LessonDto } from './dto/lesson-dto';
import { Lesson } from './entity/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @Inject('LESSON_REPOSITORY')
    private lessonRepository: Repository<Lesson>,
    @Inject(UsersService)
    private userService: UsersService,
    @Inject(InstructorsService)
    private instructorsService: InstructorsService,
    @Inject(StudentsService)
    private studentsService: StudentsService,
    @Inject(LessonTypesService)
    private lessonTypesService: LessonTypesService,
    @Inject(TimeSlotsService)
    private timeSlotsService: TimeSlotsService,
  ) {}

  async findOne(id: number) {
    return this.lessonRepository.findOne({
      relations: ['student', 'lessonType', 'instructor', 'timeSlot'],
      where: { id }
    })
  }

  async create(data: LessonDto) {
    const lessonType = await this.lessonTypesService.find(data.lessonType.id);
    const instructor = await this.instructorsService.findOne(
      data.instructor.id,
    );
    const student = await this.studentsService.findOne(data.student.id);
    const timeSlot = await this.timeSlotsService.findOne(data.timeSlot.id);
    
    if(timeSlot.instructor.id != instructor.id)
      throw new BadRequestException('Wrong instructor for timeslot')

    const lesson = new Lesson();
    lesson.note = data.note;
    lesson.status = data.status;
    lesson.lessonType = lessonType;
    lesson.instructor = instructor;
    lesson.student = student;
    lesson.timeSlot = timeSlot;
    await this.lessonRepository.save(lesson);
    await this.timeSlotsService.asignLesson(timeSlot.id, lesson);

    return lesson;
  }

  async delete(id: number) {
    const lesson = await this.findOne(id);
    // await this.timeSlotsService.clearLesson(lesson.id);
    // lesson.timeSlot = null;
    // await this.lessonRepository.save(lesson);
    return await this.lessonRepository.remove(lesson)
  }
}

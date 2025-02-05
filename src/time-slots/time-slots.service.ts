import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InstructorsService } from 'src/instructors/instructors.service';
import { Lesson } from 'src/lesson/entity/lesson.entity';
import { UsersService } from 'src/users/users.service';
import { Between, Repository } from 'typeorm';
import { TimeSlotMultipleDto } from './dto/time-slot-multiple.dto';
import { TimeSlotUpdateDto } from './dto/time-slot-update.dto';
import { TimeSlotDto } from './dto/time-slot.dto';
import { TimeSlot } from './entity/time-slot.entity';
@Injectable()
export class TimeSlotsService {
  constructor(
    @Inject('TIME_SLOTS_REPOSITORY') private timeSlotRepository: Repository<TimeSlot>,
    @Inject(InstructorsService)
    private instructorsService: InstructorsService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  async findOne(id: number) {
    return await this.timeSlotRepository.findOne({
      relations: ['instructor', 'lesson'],
      where: { id }
    })
  }

  async collidingTime(timeSlot: TimeSlot) {
    const items = await this.timeSlotRepository.find({
      relations: ['instructor'],
      where: [
        { instructor: { id: timeSlot.instructor.id }, start: Between(timeSlot.start, timeSlot.finish) },
        { instructor: { id: timeSlot.instructor.id }, finish: Between(timeSlot.start, timeSlot.finish) },
      ]
    })
    
    return items.map(slot => ({
      start: slot.start,
      finish: slot.finish
    }))
  }

  async create(data: TimeSlotDto, userId: number) {
    const user = await this.usersService.findOne(userId);
    const instructor = await this.instructorsService.findOne(data.instructor.id, true);

    if(user.school.id != instructor.school.id)
      throw new BadRequestException('User and instructor must be from same school');

    const timeSlot = new TimeSlot();
    timeSlot.start = new Date(data.start);
    timeSlot.finish = new Date(data.finish);
    timeSlot.canceled = data.canceled;
    timeSlot.instructor = instructor;

    if(timeSlot.start.getTime() > timeSlot.finish.getTime())
      throw new BadRequestException('Finish time must be greater than start time');

    const colliding = await this.collidingTime(timeSlot);
    if(colliding.length > 0) {
      throw new BadRequestException({ 
        status: 400,
        message: 'collision', 
        start: timeSlot.start.toISOString(), 
        finish: timeSlot.finish.toISOString(),
        colliding
      })
    }

    await this.timeSlotRepository.save(timeSlot);
    return timeSlot;
  }

  async createMultiple(data: TimeSlotMultipleDto, userId: number) {
    const instructor = await this.instructorsService.findOne(data.instructor.id);

    const result = [];
    for(const item of data.items) {
      const timeSlot = await this.create({
        start: item.start,
        finish: item.finish,
        instructor: data.instructor
      }, userId)
      result.push({
        start: timeSlot.start.toISOString(),
        finish: timeSlot.finish.toISOString(),
      })
    }

    return {
      items: result,
      instructor,
    }

  }

  async findForInstructor(instructorId: number) {
    const timeSlots = await this.timeSlotRepository.find({
      relations: ['instructor', 'lesson'],
      where: { instructor: { id: instructorId } }
    });
    return timeSlots.map(timeSlot => {
      delete timeSlot.instructor;
      return timeSlot;
    })
  }

  async update(id: number, data: TimeSlotUpdateDto, userId: number) {
    const user = await this.usersService.findOne(userId);
    const instructor = await this.instructorsService.findOne(data.instructor.id, true);

    if(user.school.id != instructor.school.id)
      throw new BadRequestException('User and instructor must be from same school');

    await this.timeSlotRepository.update(id, data);
    return await this.findOne(id);
  }

  async asignLesson(id: number, lesson: Lesson) {
    const timeSlot = await this.findOne(id);
    timeSlot.lesson = lesson;
    await this.timeSlotRepository.save(timeSlot);
  }

  async clearLesson(id: number) {
    const timeSlot = await this.findOne(id);
    timeSlot.lesson = null;
    await this.timeSlotRepository.save(timeSlot);
  }

  async delete(id: number, userId: number) {
    const timeSlot = await this.findOne(id);
    const user = await this.usersService.findOne(userId);
    const instructor = await this.instructorsService.findOne(timeSlot.instructor.id, true);

    if(user.school.id != instructor.school.id)
      throw new BadRequestException('User and instructor must be from same school');

    return await this.timeSlotRepository.remove(timeSlot);
  }

}

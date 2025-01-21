import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { School } from 'src/schools/entities/school.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Instructor } from './entity/instructor.entity';

@Injectable()
export class InstructorsService {
  constructor(
      @Inject('INSTRUCTOR_REPOSITORY')
        private instructorRepository: Repository<Instructor>,
      @Inject(forwardRef(() => UsersService))
      private userService: UsersService
    ) {}

  
  async create(data: Partial<Instructor>) {
    try {
          const newInstructor = new Instructor();
          
          newInstructor.name = data.name;
          newInstructor.surname = data.surname;
          newInstructor.title = data.title;
    
          const instructor = await this.instructorRepository.save(newInstructor);
          return instructor;
        } catch(e) {
          throw new BadRequestException('Instructor data incorrect.')
        }
  }

  async findOne(id: number, loadSchool = false) {
    return await this.instructorRepository.findOne({
      relations: loadSchool ? [ 'school' ] : [],
      where: { id }
    })
  }

  async findByUser(userId: number, loadSchool = false) {
    const user = await this.userService.findOne(userId);
    const instructorId = user.instructor.id;
    return await this.findOne(instructorId, loadSchool);
  }

  async update(id: number, data: Partial<Instructor>) {
    await this.instructorRepository.update(id, data);
    return await this.findOne(id);
  }

  async updateByUser(userId: number, data: Partial<Instructor>) {
    const user = await this.userService.findOne(userId);
    const instructorId = user.instructor.id;
    return await this.update(instructorId, data);
  }

  async setSchool(id: number, school: School) {
    const instructor = await this.findOne(id, true);
    instructor.school = school;
    await this.instructorRepository.save(instructor);
    return instructor;
  }
}

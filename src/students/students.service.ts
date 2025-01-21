import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
      private studentRepository: Repository<Student>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService
  ) {}

  async create(data: Partial<Student>) {
    try {
        const newStudent = new Student();
        
        newStudent.name = data.name;
        newStudent.surname = data.surname;
  
        const student = await this.studentRepository.save(newStudent);
        return student;
      } catch(e) {
        throw new BadRequestException('Instructor data incorrect.')
      }
  }

  async findOne(id: number) {
      return await this.studentRepository.findOne({
        where: { id }
      })
    }
  
    async findByUser(userId: number) {
      const user = await this.userService.findOne(userId);
      const studentId = user.student.id;
      return await this.findOne(studentId);
    }
  
    async update(id: number, data: Partial<Student>) {
      await this.studentRepository.update(id, data);
      return await this.findOne(id);
    }
  
    async updateByUser(userId: number, data: Partial<Student>) {
      const user = await this.userService.findOne(userId);
      const studentId = user.student.id;
      return await this.update(studentId, data);
    }
}

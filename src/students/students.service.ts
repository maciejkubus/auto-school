import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { School } from 'src/schools/entities/school.entity';
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

  async findOne(id: number, loadSchool = false) {
      return await this.studentRepository.findOne({
        relations: loadSchool ? [ 'school' ] : [],
        where: { id }
      })
    }
  
    async findByUser(userId: number, loadSchool = false) {
      const user = await this.userService.findOne(userId);
      const studentId = user.student.id;
      return await this.findOne(studentId, loadSchool);
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

    async setSchool(id: number, school: School) {
      const student = await this.findOne(id, true);
      student.school = school;
      await this.studentRepository.save(student);
      return student;
    }
}

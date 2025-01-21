import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolsService {
  constructor(
    @Inject('SCHOOL_REPOSITORY')
      private schoolRepository: Repository<School>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService
  ) {}

  async create(data: Partial<School>) {
    try {
      const newSchool = new School();
      
      newSchool.name = data.name;
      if(data.address) newSchool.address = data.address;
      if(data.city) newSchool.city = data.city;
      if(data.nip) newSchool.nip = data.nip;
      if(data.postalCode) newSchool.postalCode = data.nip;
      if(data.website) newSchool.website = data.website;

      const school = await this.schoolRepository.save(newSchool);
      return school;
    } catch(e) {
      throw new BadRequestException('School data incorrect.')
    }
  }

  async findOne(id: number, relations: string[] = []) {
    return await this.schoolRepository.findOne({
      relations,
      where: { id }
    })
  }

  async findByUser(userId: number, relations: string[] = []) {
    const user = await this.userService.findOne(userId);
    const schoolId = user.school.id;
    return await this.findOne(schoolId, relations);
  }

  async update(id: number, data: Partial<School>) {
    await this.schoolRepository.update(id, data);
    return await this.findOne(id)
  }

  async updateByUser(userId: number, data: Partial<School>) {
    const user = await this.userService.findOne(userId);
    const schoolId = user.school.id;
    return await this.update(schoolId, data);
  }
}

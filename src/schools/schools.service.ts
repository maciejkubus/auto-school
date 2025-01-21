import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolsService {
  constructor(
    @Inject('SCHOOL_REPOSITORY')
      private schoolRepository: Repository<School>,
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
}

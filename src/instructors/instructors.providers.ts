import { DataSource } from 'typeorm';
import { Instructor } from './entity/instructor.entity';

export const instructorsProviders = [
  {
    provide: 'INSTRUCTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Instructor),
    inject: ['DATA_SOURCE'],
  },
];

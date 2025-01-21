import { DataSource } from 'typeorm';
import { Student } from './entities/student.entity';

export const studentsProviders = [
  {
    provide: 'STUDENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Student),
    inject: ['DATA_SOURCE'],
  },
];

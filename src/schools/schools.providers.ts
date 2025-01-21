import { DataSource } from 'typeorm';
import { School } from './entities/school.entity';

export const schoolsProviders = [
  {
    provide: 'SCHOOL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(School),
    inject: ['DATA_SOURCE'],
  },
];

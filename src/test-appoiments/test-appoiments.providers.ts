import { DataSource } from 'typeorm';
import { TestAppoiment } from './entities/TestAppoiment.entity';

export const testAppoimentsProviders = [
  {
    provide: 'TEST_APPOIMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TestAppoiment),
    inject: ['DATA_SOURCE'],
  },
];

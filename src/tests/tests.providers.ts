import { DataSource } from 'typeorm';
import { Test } from './entity/test.entity';

export const testsProviders = [
  {
    provide: 'TEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Test),
    inject: ['DATA_SOURCE'],
  },
];

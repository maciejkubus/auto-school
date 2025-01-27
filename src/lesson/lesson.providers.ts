import { DataSource } from 'typeorm';
import { Lesson } from './entity/lesson.entity';

export const lessonProviders = [
  {
    provide: 'LESSON_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Lesson),
    inject: ['DATA_SOURCE'],
  },
];

import { DataSource } from 'typeorm';
import { LessonType } from './entity/lesson-type.entity';

export const lessonTypesProviders = [
  {
    provide: 'LESSON_TYPES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LessonType),
    inject: ['DATA_SOURCE'],
  },
];

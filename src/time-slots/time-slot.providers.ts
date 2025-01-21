import { DataSource } from 'typeorm';
import { TimeSlot } from './entity/time-slot.entity';

export const timeSlotsProviders = [
  {
    provide: 'TIME_SLOTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TimeSlot),
    inject: ['DATA_SOURCE'],
  },
];

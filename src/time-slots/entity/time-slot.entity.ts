import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from "src/instructors/entity/instructor.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class TimeSlot extends DefaultEntity {
  @Column('datetime')
  start: Date;

  @Column('datetime')
  finish: Date;

  @Column('bool', { default: false })
  canceled: boolean;

  @ManyToOne(() => Instructor, (instructor) => instructor.timeSlots, { nullable: true })
  instructor?: Instructor;
}
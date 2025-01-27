import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from "src/instructors/entity/instructor.entity";
import { Lesson } from "src/lesson/entity/lesson.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

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

  @OneToOne(() => Lesson, (lesson) => lesson.timeSlot, { nullable: true, eager: true, onDelete: "SET NULL" })
  @JoinColumn()
  lesson?: Lesson | null;
}
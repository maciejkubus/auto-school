import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from "src/instructors/entity/instructor.entity";
import { LessonType } from "src/lesson-types/entity/lesson-type.entity";
import { Student } from "src/students/entities/student.entity";
import { TimeSlot } from "src/time-slots/entity/time-slot.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { LessonStatus } from "../enums/lesson-status.enum";

@Entity()
export class Lesson extends DefaultEntity {

  @Column('varchar', { nullable: true })
  note?: string;

  @Column({
    type: "enum",
    enum: LessonStatus,
    default: LessonStatus.BOOKED
  })
  status: LessonStatus;

  @OneToOne(() => TimeSlot, (timeSlot) => timeSlot.lesson, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  timeSlot?: TimeSlot | null;

  @ManyToOne(() => LessonType, (lessonType) => lessonType.lessons, { nullable: true })
  lessonType?: LessonType;

  @ManyToOne(() => Student, (student) => student.lessons, { nullable: true })
  student?: Student;

  @ManyToOne(() => Instructor, (instructor) => instructor.lessons, { nullable: true, eager: true })
  instructor?: Instructor;
}
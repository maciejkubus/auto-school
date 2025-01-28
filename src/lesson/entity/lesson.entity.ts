import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
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
  @ApiProperty({
    example: 'Check homework.',
    description: 'Quick note about lesson',
    required: false,
  })
  note?: string;

  @Column({
    type: "enum",
    enum: LessonStatus,
    default: LessonStatus.BOOKED
  })
  @ApiProperty({
    example: 'booked',
    description: 'Lesson Status (booked, done, canceled)',
    required: false,
    enum: LessonStatus,
  })
  status: LessonStatus;

  @OneToOne(() => TimeSlot, (timeSlot) => timeSlot.lesson, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto,
    required: false,
  })
  timeSlot?: TimeSlot | null;

  @ManyToOne(() => LessonType, (lessonType) => lessonType.lessons, { nullable: true })
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto,
    required: false,
  })
  lessonType?: LessonType;

  @ManyToOne(() => Student, (student) => student.lessons, { nullable: true })
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto,
    required: false,
  })
  student?: Student;

  @ManyToOne(() => Instructor, (instructor) => instructor.lessons, { nullable: true, eager: true })
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto,
    required: false,
  })
  instructor?: Instructor;
}
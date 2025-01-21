import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from "src/instructors/entity/instructor.entity";
import { Student } from "src/students/entities/student.entity";
import { Test } from "src/tests/entity/test.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { TestAppoimentStatus } from "../enums/test-appoiment-status.enum";

@Entity()
export class TestAppoiment extends DefaultEntity {
  @Column({
    type: "enum",
    enum: TestAppoimentStatus,
    default: TestAppoimentStatus.ENROLLED
  })
  status: TestAppoimentStatus;

  @Column('varchar', { nullable: true })
  note?: string;

  @Column('integer')
  points: number;

  @Column('datetime')
  start: Date;

  @Column('datetime')
  finish: Date;

  @ManyToOne(() => Test, (test) => test.appoiments, { nullable: true })
  test?: Test;

  @ManyToOne(() => Student, (student) => student.appoiments, { nullable: true })
  student?: Student;

  @ManyToOne(() => Instructor, (instructor) => instructor.appoiments, { nullable: true })
  instructor?: Instructor;
}
import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
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
  @ApiProperty({
    example: 'ENROLLED',
    description: 'Test status (enrolled, passed, failed, canceled)',
    enum: TestAppoimentStatus,
  })
  status: TestAppoimentStatus;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: 'super secret note...',
    description: 'Quick note about test',
    required: false,
  })
  note?: string;

  @Column('integer', { default: 0 })
  @ApiProperty({
    example: 100,
    description: 'Points earned on test',
    required: false,
  })
  points: number;

  @Column('datetime')
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Test start time' 
  })
  start: Date;

  @Column('datetime')
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Test finisg time' 
  })
  finish: Date;

  @ManyToOne(() => Test, (test) => test.appoiments, { nullable: true })
  @ApiProperty({
    nullable: true,
    type: () => RelationDto
  })
  test?: Test;

  @ManyToOne(() => Student, (student) => student.appoiments, { nullable: true })
  @ApiProperty({
    nullable: true,
    type: () => RelationDto
  })
  student?: Student;

  @ManyToOne(() => Instructor, (instructor) => instructor.appoiments, { nullable: true })
  @ApiProperty({
    nullable: true,
    type: () => RelationDto
  })
  instructor?: Instructor;
}
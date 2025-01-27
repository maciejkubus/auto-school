import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
import { DefaultEntity } from "src/database/entities/default-entity";
import { Lesson } from "src/lesson/entity/lesson.entity";
import { School } from "src/schools/entities/school.entity";
import { TestAppoiment } from "src/test-appoiments/entities/TestAppoiment.entity";
import { TimeSlot } from "src/time-slots/entity/time-slot.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Instructor extends DefaultEntity {
  @Column('varchar')
  @ApiProperty({
    example: 'John',
    description: 'First Name',
  })
  name: string;

  @Column('varchar')
  @ApiProperty({
    example: 'Last name',
    description: 'Krasinski',
  })
  surname: string;

  @Column('varchar')
  @ApiProperty({
    example: 'Title',
    description: 'Senior instructor',
  })
  title: string;

  @OneToOne(() => User, (user) => user.instructor, { nullable: true })
  @JoinColumn()
  @ApiProperty({
    example: () => RelationDto,
    description: 'user',
    nullable: true,
    type: () => RelationDto,
  })
  user?: User;

  @ManyToOne(() => School, (school) => school.instructors, { nullable: true })
  @ApiProperty({
    description: 'User',
    nullable: true,
    type: () => RelationDto,
  })
  school?: School;

  @OneToMany(() => TestAppoiment, (testAppoiment) => testAppoiment.instructor)
  appoiments?: TestAppoiment[];

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.instructor)
  timeSlots?: TimeSlot[];

  @OneToMany(() => Lesson, (lesson) => lesson.instructor)
  lessons?: Lesson[];
}
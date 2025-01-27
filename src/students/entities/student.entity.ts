import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
import { DefaultEntity } from "src/database/entities/default-entity";
import { Lesson } from "src/lesson/entity/lesson.entity";
import { School } from "src/schools/entities/school.entity";
import { TestAppoiment } from "src/test-appoiments/entities/TestAppoiment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Student extends DefaultEntity {
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

  @OneToOne(() => User, (user) => user.student, { nullable: true })
  @JoinColumn()
  @ApiProperty({
    example: () => RelationDto,
    description: 'user',
    nullable: true,
    type: () => RelationDto,
  })
  user?: User;

  @ManyToOne(() => School, (school) => school.students, { nullable: true })
  @ManyToOne(() => School, (school) => school.instructors, { nullable: true })
  @ApiProperty({
    description: 'User',
    nullable: true,
    type: () => RelationDto,
  })
  school?: School;

  @OneToMany(() => TestAppoiment, (testAppoiment) => testAppoiment.student)
  appoiments?: TestAppoiment[];

  @OneToMany(() => Lesson, (lesson) => lesson.student)
  lessons?: Lesson[];
}
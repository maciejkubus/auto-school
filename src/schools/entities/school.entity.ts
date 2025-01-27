import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from "src/instructors/entity/instructor.entity";
import { LessonType } from "src/lesson-types/entity/lesson-type.entity";
import { Student } from "src/students/entities/student.entity";
import { Test } from "src/tests/entity/test.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class School extends DefaultEntity {
  @Column('varchar')
  @ApiProperty({
    example: 'Ultimate School',
    description: 'name of school',
  })
  name: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: 'Raclawicka 1/12',
    description: 'adress of school',
    nullable: true,
  })
  address?: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: '93-403',
    description: 'postal code of school',
    nullable: true,
  })
  postalCode?: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: 'Warszawa',
    description: 'city of school',
    nullable: true,
  })
  city?: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: '5262490114',
    description: 'nip of school',
    nullable: true,
  })
  nip?: string;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    example: 'www.auto-school.example',
    description: 'website url of school',
    nullable: true,
  })
  website?: string;

  @OneToOne(() => User, (user) => user.school, { nullable: true })
  @JoinColumn()
  @ApiProperty({
    description: 'User',
    nullable: true,
    type: () => RelationDto,
  })
  user?: User;

  @OneToMany(() => Instructor, (instructor) => instructor.school)
  instructors?: Instructor[];

  @OneToMany(() => Student, (student) => student.school)
  students?: Student[];

  @OneToMany(() => Test, (test) => test.school)
  tests?: Test[];

  @OneToMany(() => LessonType, (lessonType) => lessonType.school)
  lessonTypes?: LessonType[];
}
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { RelationDto } from 'src/database/dto/relation.dto';
import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from 'src/instructors/entity/instructor.entity';
import { School } from 'src/schools/entities/school.entity';
import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, JoinColumn, OneToOne, Unique } from "typeorm";
import { UserType } from "../enums/user-types.enum";

@Entity()
export class User extends DefaultEntity {
  @Column('varchar')
  @Unique(['email'])
  @ApiProperty({
    example: 'maciekkubus@gmail.com',
    description: 'E-mail adress',
  })
  email: string;

  @Column('varchar', { select: false })
  @ApiProperty({
    example: 'PaSsWoRd420',
    description: 'password',
  })
  password: string;

  private tempPassword?: string;

  @Column('datetime', { default: null, nullable: true })
  @ApiProperty({
    example: '2000-03-25T03:15:00.000Z',
    description: 'Date of user archivation. If property is null then user is active',
  })
  archived?: Date;

  @Column({
    type: "enum",
    enum: UserType,
  })
  @ApiProperty({
    example: 'SCHOOL',
    description: 'User type (school, instructor, student)',
    enum: UserType,
  })
  type: UserType;

  public hashPassword(password: string): void {
    this.password = hashSync(password, 8);
  }

  @OneToOne(() => School, (school) => school.user, { nullable: true })
  @JoinColumn()
  @ApiProperty({
    description: 'If type is set to school this property defines school relation',
    nullable: true,
    type: () => RelationDto
  })
  school?: School;

  @OneToOne(() => Instructor, (instructor) => instructor.user, { nullable: true })
  @JoinColumn()
  @ApiProperty({
    description: 'If type is set to instructor this property defines instructor relation',
    nullable: true,
    type: () => RelationDto
  })
  instructor?: Instructor;

  @OneToOne(() => Student, (student) => student.user, { nullable: true })
  @JoinColumn()
  @ApiProperty({
    description: 'If type is set to student this property defines school relation',
    nullable: true,
    type: () => RelationDto,
  })
  student?: Student;
}
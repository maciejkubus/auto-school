import { hashSync } from 'bcryptjs';
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
  email: string;

  @Column('varchar', { select: false })
  password: string;

  private tempPassword?: string;

  @Column('datetime', { default: null, nullable: true })
  archived?: Date;

  @Column({
    type: "enum",
    enum: UserType,
  })
  type: UserType;

  public hashPassword(password: string): void {
    this.password = hashSync(password, 8);
  }

  @OneToOne(() => School, (school) => school.user, { nullable: true })
  @JoinColumn()
  school?: School;

  @OneToOne(() => Instructor, (instructor) => instructor.user, { nullable: true })
  @JoinColumn()
  instructor?: Instructor;

  @OneToOne(() => Student, (student) => student.user, { nullable: true })
  @JoinColumn()
  student?: Student;
}
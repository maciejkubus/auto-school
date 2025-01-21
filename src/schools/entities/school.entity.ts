import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from "src/instructors/entity/instructor.entity";
import { Student } from "src/students/entities/student.entity";
import { Test } from "src/tests/entity/test.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity()
export class School extends DefaultEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  address?: string;

  @Column('varchar', { nullable: true })
  postalCode?: string;

  @Column('varchar', { nullable: true })
  city?: string;

  @Column('varchar', { nullable: true })
  nip?: string;

  @Column('varchar', { nullable: true })
  website?: string;

  @OneToOne(() => User, (user) => user.school, { nullable: true })
  @JoinColumn()
  user?: User;

  @OneToMany(() => Instructor, (instructor) => instructor.school)
  instructors?: Instructor[];

  @OneToMany(() => Student, (student) => student.school)
  students?: Student[];

  @OneToMany(() => Test, (test) => test.school)
  tests?: Test[];
}
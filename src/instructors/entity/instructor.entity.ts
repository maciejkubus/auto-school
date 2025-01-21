import { DefaultEntity } from "src/database/entities/default-entity";
import { School } from "src/schools/entities/school.entity";
import { TestAppoiment } from "src/test-appoiments/entities/TestAppoiment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class Instructor extends DefaultEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @Column('varchar')
  title: string;

  @OneToOne(() => User, (user) => user.instructor, { nullable: true })
  @JoinColumn()
  user?: User;

  @ManyToOne(() => School, (school) => school.instructors, { nullable: true })
  school?: School;

  @OneToMany(() => TestAppoiment, (testAppoiment) => testAppoiment.instructor)
  appoiments?: TestAppoiment[];
}
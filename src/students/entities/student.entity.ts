import { DefaultEntity } from "src/database/entities/default-entity";
import { School } from "src/schools/entities/school.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Student extends DefaultEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @OneToOne(() => User, (user) => user.student, { nullable: true })
  @JoinColumn()
  user?: User;

  @ManyToOne(() => School, (school) => school.students, { nullable: true })
  school?: School;
}
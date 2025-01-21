import { DefaultEntity } from "src/database/entities/default-entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

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
}
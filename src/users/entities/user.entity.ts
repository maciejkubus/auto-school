import { hashSync } from 'bcryptjs';
import { DefaultEntity } from "src/database/entities/default-entity";
import { Column, Entity, Unique } from "typeorm";
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
}
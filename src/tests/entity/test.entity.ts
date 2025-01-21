import { DefaultEntity } from "src/database/entities/default-entity";
import { School } from 'src/schools/entities/school.entity';
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Test extends DefaultEntity {
  @Column('varchar')
  name: string;

  @Column('integer')
  maxPoints: number;

  @Column('integer')
  pointsToPass: number;

  @ManyToOne(() => School, (school) => school.tests, { nullable: true })
  school?: School;
}
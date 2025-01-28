import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
import { DefaultEntity } from "src/database/entities/default-entity";
import { School } from 'src/schools/entities/school.entity';
import { TestAppoiment } from "src/test-appoiments/entities/TestAppoiment.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Test extends DefaultEntity {
  @Column('varchar')
  @ApiProperty({
    example: 'Unit I',
    description: 'Name of the test.',
  })
  name: string;

  @Column('integer')
  @ApiProperty({
    example: 50,
    description: 'Max amount of point to earn on the test',
  })
  maxPoints: number;

  @Column('integer')
  @ApiProperty({
    example: 20,
    description: 'Amount of point required to pass the test',
  })
  pointsToPass: number;

  @ManyToOne(() => School, (school) => school.tests, { nullable: true })
  @ApiProperty({
    description: 'School',
    nullable: true,
    type: () => RelationDto,
  })
  school?: School;

  @OneToMany(() => TestAppoiment, (testAppoiment) => testAppoiment.test)
  appoiments?: TestAppoiment[];
}
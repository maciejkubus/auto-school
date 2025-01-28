import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
import { DefaultEntity } from "src/database/entities/default-entity";
import { Lesson } from "src/lesson/entity/lesson.entity";
import { School } from "src/schools/entities/school.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class LessonType extends DefaultEntity {
  @Column('varchar')
  @ApiProperty({
    example: 'Car lesson',
    description: 'lesson type name',
  })
  name: string;

  @Column('varchar')
  @ApiProperty({
    example: 'lesson in car',
    description: 'lesson type description',
  })
  description: string;

  @ManyToOne(() => School, (school) => school.instructors, { nullable: true })
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto,
    nullable: true,
  })
  school?: School;

  @OneToMany(() => Lesson, (lesson) => lesson.lessonType)
  lessons?: Lesson[];
}
import { DefaultEntity } from "src/database/entities/default-entity";
import { Lesson } from "src/lesson/entity/lesson.entity";
import { School } from "src/schools/entities/school.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class LessonType extends DefaultEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @ManyToOne(() => School, (school) => school.instructors, { nullable: true })
  school?: School;

  @OneToMany(() => Lesson, (lesson) => lesson.lessonType)
  lessons?: Lesson[];
}
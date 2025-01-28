import { ApiProperty } from "@nestjs/swagger";
import { RelationDto } from "src/database/dto/relation.dto";
import { DefaultEntity } from "src/database/entities/default-entity";
import { Instructor } from "src/instructors/entity/instructor.entity";
import { Lesson } from "src/lesson/entity/lesson.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class TimeSlot extends DefaultEntity {
  @Column('datetime')
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Slot start' 
  })
  start: Date;

  @Column('datetime')
  @ApiProperty({ 
    example: '2000-03-25T03:15:00.000Z', 
    description: 'Slot end' 
  })
  finish: Date;

  @Column('bool', { default: false })
  @ApiProperty({ 
    example: false, 
    description: 'is time slot canceled' 
  })
  canceled: boolean;

  @ManyToOne(() => Instructor, (instructor) => instructor.timeSlots, { nullable: true })
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  instructor?: Instructor;

  @OneToOne(() => Lesson, (lesson) => lesson.timeSlot, { nullable: true, eager: true, onDelete: "SET NULL" })
  @JoinColumn()
  @ApiProperty({
    example: RelationDto,
    type: () => RelationDto
  })
  lesson?: Lesson | null;
}
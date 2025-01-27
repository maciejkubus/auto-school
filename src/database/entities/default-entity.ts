import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class DefaultEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  id?: number;

  @CreateDateColumn()
  @ApiProperty({ example: '2000-03-25T03:15:00.000Z', description: 'Created date' })
  created_at?: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2000-03-25T03:15:00.000Z', description: 'Last updated date' })
  updated_at?: Date;
}
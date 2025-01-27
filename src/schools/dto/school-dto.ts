import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SchoolDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Ultimate School',
    description: 'name of school',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Raclawicka 1/12',
    description: 'adress of school',
    nullable: true,
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '93-403',
    description: 'postal code of school',
    nullable: true,
  })
  postalCode?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Warszawa',
    description: 'city of school',
    nullable: true,
  })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '5262490114',
    description: 'nip of school',
    nullable: true,
  })
  nip?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'www.auto-school.example',
    description: 'website url of school',
    nullable: true,
  })
  website?: string;
}
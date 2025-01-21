import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  nip?: string;

  @IsString()
  @IsOptional()
  website?: string;
}
import { PartialType } from "@nestjs/mapped-types";
import { SchoolDto } from "./school-dto";

export class SchoolUpdateDto extends PartialType(SchoolDto) {}
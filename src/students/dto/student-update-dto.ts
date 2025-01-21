import { PartialType } from "@nestjs/mapped-types";
import { StudentDto } from "./student-dto";

export class StudentUpdateDto extends PartialType(StudentDto) {}
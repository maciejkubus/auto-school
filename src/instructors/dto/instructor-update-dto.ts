import { PartialType } from "@nestjs/mapped-types";
import { InstructorDto } from "./instructor-dto";

export class InstructorUpdateDto extends PartialType(InstructorDto) {}
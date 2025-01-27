import { PartialType } from "@nestjs/mapped-types";
import { LessonDto } from "./lesson-dto";

export class LessonUpdateDto extends PartialType(LessonDto) {}
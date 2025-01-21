import { PartialType } from "@nestjs/mapped-types";
import { LessonType } from "../entity/lesson-type.entity";

export class LessonTypeUpdateDto extends PartialType(LessonType) {}
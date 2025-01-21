import { PartialType } from "@nestjs/mapped-types";
import { TimeSlotDto } from "./time-slot.dto";

export class TimeSlotUpdateDto extends PartialType(TimeSlotDto) {}
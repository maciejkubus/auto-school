import { PartialType } from "@nestjs/mapped-types";
import { TestAppoimentDto } from "./test-appoiment-dto";

export class TestAppoimentUpdateDto extends PartialType(TestAppoimentDto) {}
import { PartialType } from "@nestjs/mapped-types";
import { TestDto } from "./test-dto";

export class TestUpdateDto extends PartialType(TestDto) {}
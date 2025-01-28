import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { TestDto } from './dto/test-dto';
import { TestUpdateDto } from './dto/test-update-dto';
import { Test } from './entity/test.entity';
import { TestInSchoolGuard } from './guards/test-in-school.guard';
import { TestsService } from './tests.service';

@Controller('tests')
@ApiTags('Tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get()
  @ApiResponse({
    description: 'All tests in logged in school',
    type: () => Test,
    isArray: true
  })
  async getAll(@Request() req) {
    return await this.testsService.findAllByUserId(+req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  @ApiResponse({
    description: 'Add a test',
    type: () => Test,
  })
  async create(@Body() body: TestDto, @Request() req) {
    return await this.testsService.create(body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard, TestInSchoolGuard)
  @Patch(':id')
  @ApiResponse({
    description: 'Update a test',
    type: () => Test,
  })
  @ApiBody({
    type: () => TestDto,
  })
  async update(@Param('id') id: number, @Body() body: TestUpdateDto) {
    return await this.testsService.update(+id, body);
  }
}

import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { TestDto } from './dto/test-dto';
import { TestUpdateDto } from './dto/test-update-dto';
import { TestInSchoolGuard } from './guards/test-in-school.guard';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get()
  async getAll(@Request() req) {
    return await this.testsService.findAllByUserId(+req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  async create(@Body() body: TestDto, @Request() req) {
    return await this.testsService.create(body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard, TestInSchoolGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: TestUpdateDto, @Request() req) {
    return await this.testsService.update(+id, body);
  }
}

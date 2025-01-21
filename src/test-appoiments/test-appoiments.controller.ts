import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { TestAppoimentDto } from './dto/test-appoiment-dto';
import { TestAppoimentUpdateDto } from './dto/test-appoiment-update-dto';
import { AppoimentInSchoolGuard } from './guards/appoiment-in-school.guard';
import { TestAppoimentsService } from './test-appoiments.service';

@Controller('appoiments')
export class TestAppoimentsController {
  constructor(private readonly testAppoimentsService: TestAppoimentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: TestAppoimentDto, @Request() req) {
    return await this.testAppoimentsService.create(body, +req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard, AppoimentInSchoolGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: TestAppoimentUpdateDto, @Request() req) {
    return await this.testAppoimentsService.update(+id, body);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get()
  async getAll(@Request() req) {
    return await this.testAppoimentsService.findAllInSchool(+req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get('student/:id')
  async getByStudent(@Param('id') id: number, @Request() req) {
    return await this.testAppoimentsService.find({ student: { id: +id } }, ['student']);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get('instructor/:id')
  async getByInstructor(@Param('id') id: number, @Request() req) {
    return await this.testAppoimentsService.find({ instructor: { id: +id } }, ['instructor']);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get('test/:id')
  async getByTest(@Param('id') id: number, @Request() req) {
    return await this.testAppoimentsService.find({ test: { id: +id } }, ['test']);
  }
}

import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { TestAppoimentDto } from './dto/test-appoiment-dto';
import { TestAppoimentUpdateDto } from './dto/test-appoiment-update-dto';
import { TestAppoiment } from './entities/TestAppoiment.entity';
import { AppoimentInSchoolGuard } from './guards/appoiment-in-school.guard';
import { TestAppoimentsService } from './test-appoiments.service';

@Controller('appoiments')
@ApiTags('Test Appoiments')
export class TestAppoimentsController {
  constructor(private readonly testAppoimentsService: TestAppoimentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiResponse({
    description: 'Add a test appoiment',
    type: TestAppoiment,
  })
  async create(@Body() body: TestAppoimentDto, @Request() req) {
    return await this.testAppoimentsService.create(body, +req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard, AppoimentInSchoolGuard)
  @Patch(':id')
  @ApiResponse({
    description: 'Update a test appoiment',
    type: TestAppoiment,
  })
  @ApiBody({
    type: () => TestAppoimentDto
  })
  async update(@Param('id') id: number, @Body() body: TestAppoimentUpdateDto) {
    return await this.testAppoimentsService.update(+id, body);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get()
  @ApiResponse({
    description: 'Get all appoiments for logged school',
    type: () => TestAppoiment,
    isArray: true,
  })
  async getAll(@Request() req) {
    return await this.testAppoimentsService.findAllInSchool(+req.user.id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get('student/:id')
  @ApiResponse({
    description: 'Get all appoiments by user id',
    type: () => TestAppoiment,
    isArray: true,
  })
  async getByStudent(@Param('id') id: number) {
    return await this.testAppoimentsService.find({ student: { id: +id } }, ['student']);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get('instructor/:id')
  @ApiResponse({
    description: 'Get all appoiments by instructor id',
    type: () => TestAppoiment,
    isArray: true,
  })
  async getByInstructor(@Param('id') id: number) {
    return await this.testAppoimentsService.find({ instructor: { id: +id } }, ['instructor']);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Get('test/:id')
  @ApiResponse({
    description: 'Get single appoiment',
    type: () => TestAppoiment,
  })
  async getByTest(@Param('id') id: number) {
    return await this.testAppoimentsService.find({ test: { id: +id } }, ['test']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  @ApiResponse({
    description: 'Get all my appoiments',
    type: () => TestAppoiment,
    isArray: true,
  })
  async getMine(@Request() req) {
    return await this.testAppoimentsService.findAllWithUser(+req.user.id);
  }
}

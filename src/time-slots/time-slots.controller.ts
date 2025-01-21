import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { TimeSlotMultipleDto } from './dto/time-slot-multiple.dto';
import { TimeSlotUpdateDto } from './dto/time-slot-update.dto';
import { TimeSlotDto } from './dto/time-slot.dto';
import { TimeSlotsService } from './time-slots.service';

@Controller('time-slots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  async create(@Body() body: TimeSlotDto, @Request() req) {
    return await this.timeSlotsService.create(body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post('add-multiple')
  async createMultiple(@Body() body: TimeSlotMultipleDto, @Request() req) {
    return await this.timeSlotsService.createMultiple(body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('instructor/:id')
  async getAll(@Param() id: number) {
    return await this.timeSlotsService.findForInstructor(+id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: TimeSlotUpdateDto, @Request() req) {
    return await this.timeSlotsService.update(+id, body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Request() req) {
    return await this.timeSlotsService.delete(+id, +req.user.id);
  }
}

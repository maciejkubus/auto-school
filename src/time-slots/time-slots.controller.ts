import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsSchoolGuard } from 'src/users/guards/is-school.guard';
import { TimeSlotMultipleDto } from './dto/time-slot-multiple.dto';
import { TimeSlotUpdateDto } from './dto/time-slot-update.dto';
import { TimeSlotDto } from './dto/time-slot.dto';
import { TimeSlot } from './entity/time-slot.entity';
import { TimeSlotsService } from './time-slots.service';

@Controller('time-slots')
@ApiTags('Time Slots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post()
  @ApiResponse({
    description: 'Create time slot',
    type: TimeSlot,
  })
  async create(@Body() body: TimeSlotDto, @Request() req) {
    return await this.timeSlotsService.create(body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Post('add-multiple')
  @ApiResponse({
    description: 'Create multiple time slots',
    type: () => TimeSlotMultipleDto,
  })
  async createMultiple(@Body() body: TimeSlotMultipleDto, @Request() req) {
    return await this.timeSlotsService.createMultiple(body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('instructor/:id')
  @ApiResponse({
    description: 'Find all time slots for instructor',
    type: () => TimeSlot,
    isArray: true,
  })
  async getAll(@Param('id') id: number) {
    return await this.timeSlotsService.findForInstructor(+id)
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Patch(':id')
  @ApiResponse({
    description: 'Update time slot',
    type: () => TimeSlot,
  })
  @ApiBody({
    type: () => TimeSlotDto,
  })
  async update(@Param('id') id: number, @Body() body: TimeSlotUpdateDto, @Request() req) {
    return await this.timeSlotsService.update(+id, body, +req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), IsSchoolGuard)
  @Delete(':id')
  @ApiResponse({
    description: 'removes time slot',
  })
  async delete(@Param('id') id: number, @Request() req) {
    return await this.timeSlotsService.delete(+id, +req.user.id);
  }
}

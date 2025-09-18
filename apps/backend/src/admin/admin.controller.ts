import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateEventDto } from '../events/dto/create-event.dto';
import { UpdateEventDto } from '../events/dto/update-event.dto';
import { CreateScheduleItemDto } from './dto/create-schedule-item.dto';
import { UpdateScheduleItemDto } from './dto/update-schedule-item.dto';

// TODO: Add JWT Auth Guard for admin routes
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Event management
  @Get('events')
  getAllEvents() {
    // TODO: Get from JWT token
    const adminId = 'temp-admin-id';
    return this.adminService.getAllEvents(adminId);
  }

  @Post('events')
  createEvent(@Body() createEventDto: CreateEventDto) {
    // TODO: Get from JWT token
    const adminId = 'temp-admin-id';
    return this.adminService.createEvent(adminId, createEventDto);
  }

  @Get('events/:id')
  getEvent(@Param('id') id: string) {
    return this.adminService.getEvent(id);
  }

  @Patch('events/:id')
  updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.adminService.updateEvent(id, updateEventDto);
  }

  @Delete('events/:id')
  deleteEvent(@Param('id') id: string) {
    return this.adminService.deleteEvent(id);
  }

  @Post('events/:id/copy')
  copyEvent(@Param('id') id: string, @Body() data: { newStartDate?: Date }) {
    return this.adminService.copyEvent(id, data.newStartDate);
  }

  // Schedule management
  @Get('events/:id/schedule')
  getScheduleItems(@Param('id') eventId: string) {
    return this.adminService.getScheduleItems(eventId);
  }

  @Post('events/:id/schedule')
  createScheduleItem(
    @Param('id') eventId: string,
    @Body() createScheduleItemDto: CreateScheduleItemDto,
  ) {
    return this.adminService.createScheduleItem(eventId, createScheduleItemDto);
  }

  @Patch('schedule/:id')
  updateScheduleItem(
    @Param('id') id: string,
    @Body() updateScheduleItemDto: UpdateScheduleItemDto,
  ) {
    return this.adminService.updateScheduleItem(id, updateScheduleItemDto);
  }

  @Delete('schedule/:id')
  deleteScheduleItem(@Param('id') id: string) {
    return this.adminService.deleteScheduleItem(id);
  }

  @Patch('schedule/:id/reorder')
  reorderScheduleItem(@Param('id') id: string, @Body() data: { sortOrder: number }) {
    return this.adminService.reorderScheduleItem(id, data.sortOrder);
  }

  // Media management
  @Get('events/:id/media')
  getEventMedia(@Param('id') eventId: string) {
    return this.adminService.getEventMedia(eventId);
  }

  @Delete('media/:id')
  deleteMedia(@Param('id') id: string) {
    return this.adminService.deleteMedia(id);
  }

  // Export functions
  @Post('events/:id/export/media')
  exportMedia(@Param('id') eventId: string, @Body() data: { size: 'small' | 'medium' | 'original' }) {
    return this.adminService.exportMedia(eventId, data.size);
  }

  @Post('events/:id/export/pdf')
  exportPDF(@Param('id') eventId: string, @Body() data: { customDescription?: string }) {
    return this.adminService.exportPDF(eventId, data.customDescription);
  }

  @Post('events/:id/export/qr')
  exportQR(
    @Param('id') eventId: string,
    @Body() data: { 
      foregroundColor?: string;
      backgroundColor?: string;
      size?: number;
    }
  ) {
    return this.adminService.exportQR(eventId, data);
  }
}

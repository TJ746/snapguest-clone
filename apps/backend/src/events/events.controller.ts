import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Guest endpoints - public access via event ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOneForGuest(id);
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') eventId: string) {
    return this.eventsService.getSchedule(eventId);
  }

  @Get(':id/media')
  getMedia(
    @Param('id') eventId: string,
    @Query('filter') filter?: string,
    @Query('user') user?: string,
    @Query('timeline') timeline?: string,
    @Query('order') order?: string,
    @Query('page') page?: string,
  ) {
    return this.eventsService.getMedia(eventId, {
      filter,
      user,
      timeline,
      order,
      page: page ? parseInt(page) : 1,
    });
  }

  @Get(':id/chat')
  getChat(@Param('id') eventId: string, @Query('limit') limit?: string) {
    return this.eventsService.getChat(eventId, limit ? parseInt(limit) : 50);
  }
}

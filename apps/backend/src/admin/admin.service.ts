import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from '../events/dto/create-event.dto';
import { UpdateEventDto } from '../events/dto/update-event.dto';
import { CreateScheduleItemDto } from './dto/create-schedule-item.dto';
import { UpdateScheduleItemDto } from './dto/update-schedule-item.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Event management
  async getAllEvents(adminId: string) {
    return this.prisma.event.findMany({
      where: { adminId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            media: true,
            chatMessages: true,
            scheduleItems: true,
          },
        },
      },
    });
  }

  async createEvent(adminId: string, createEventDto: CreateEventDto) {
    const joinCode = this.generateJoinCode();
    
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        adminId,
        joinCode,
      },
    });
  }

  async getEvent(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        scheduleItems: {
          orderBy: [{ startAt: 'asc' }, { sortOrder: 'asc' }],
        },
        _count: {
          select: {
            media: true,
            chatMessages: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async updateEvent(id: string, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async deleteEvent(id: string) {
    // This will cascade delete all related data
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async copyEvent(id: string, newStartDate?: Date) {
    const originalEvent = await this.prisma.event.findUnique({
      where: { id },
      include: {
        scheduleItems: true,
      },
    });

    if (!originalEvent) {
      throw new NotFoundException('Event not found');
    }

    const { id: originalId, createdAt, updatedAt, joinCode, scheduleItems, ...eventData } = originalEvent;
    const newJoinCode = this.generateJoinCode();

    // Calculate date offset if new start date provided
    let dateOffset = 0;
    if (newStartDate && originalEvent.startsAt) {
      dateOffset = newStartDate.getTime() - originalEvent.startsAt.getTime();
    }
    
    const newEvent = await this.prisma.event.create({
      data: {
        ...eventData,
        joinCode: newJoinCode,
        startsAt: newStartDate || eventData.startsAt,
        endsAt: eventData.endsAt && dateOffset 
          ? new Date(eventData.endsAt.getTime() + dateOffset) 
          : eventData.endsAt,
      },
    });

    // Copy schedule items with adjusted dates
    if (originalEvent.scheduleItems.length > 0) {
      const scheduleItemsData = originalEvent.scheduleItems.map(item => {
        const { id, createdAt, updatedAt, eventId, ...itemData } = item;
        return {
          ...itemData,
          eventId: newEvent.id,
          startAt: dateOffset ? new Date(item.startAt.getTime() + dateOffset) : item.startAt,
          endAt: item.endAt && dateOffset 
            ? new Date(item.endAt.getTime() + dateOffset) 
            : item.endAt,
        };
      });

      await this.prisma.scheduleItem.createMany({
        data: scheduleItemsData,
      });
    }

    return newEvent;
  }

  // Schedule management
  async getScheduleItems(eventId: string) {
    return this.prisma.scheduleItem.findMany({
      where: { eventId },
      orderBy: [{ startAt: 'asc' }, { sortOrder: 'asc' }],
    });
  }

  async createScheduleItem(eventId: string, createScheduleItemDto: CreateScheduleItemDto) {
    return this.prisma.scheduleItem.create({
      data: {
        ...createScheduleItemDto,
        eventId,
      },
    });
  }

  async updateScheduleItem(id: string, updateScheduleItemDto: UpdateScheduleItemDto) {
    return this.prisma.scheduleItem.update({
      where: { id },
      data: updateScheduleItemDto,
    });
  }

  async deleteScheduleItem(id: string) {
    return this.prisma.scheduleItem.delete({
      where: { id },
    });
  }

  async reorderScheduleItem(id: string, sortOrder: number) {
    return this.prisma.scheduleItem.update({
      where: { id },
      data: { sortOrder },
    });
  }

  // Media management
  async getEventMedia(eventId: string) {
    return this.prisma.media.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
      include: {
        comments: true,
        _count: {
          select: { likes: true, comments: true },
        },
      },
    });
  }

  async deleteMedia(id: string) {
    return this.prisma.media.delete({
      where: { id },
    });
  }

  // Export functions (placeholder implementations)
  async exportMedia(eventId: string, size: 'small' | 'medium' | 'original') {
    const media = await this.prisma.media.findMany({
      where: { eventId },
      select: {
        originalUrl: true,
        thumbnailUrl: true,
        uploaderName: true,
        createdAt: true,
      },
    });

    // TODO: Implement actual export logic (zip creation, etc.)
    return {
      message: `Export initiated for ${media.length} files in ${size} size`,
      downloadUrl: 'https://example.com/download/export.zip',
    };
  }

  async exportPDF(eventId: string, customDescription?: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // TODO: Implement PDF generation with QR code
    return {
      message: 'PDF invitation generated',
      downloadUrl: 'https://example.com/download/invitation.pdf',
    };
  }

  async exportQR(eventId: string, options: {
    foregroundColor?: string;
    backgroundColor?: string;
    size?: number;
  }) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // TODO: Implement QR code generation
    const qrUrl = `https://your-domain.com/de_CH/by-id/${eventId}`;
    
    return {
      message: 'QR code generated',
      downloadUrl: 'https://example.com/download/qr-code.svg',
      qrUrl,
    };
  }

  private generateJoinCode(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

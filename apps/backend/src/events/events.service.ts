import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // Guest access - public event info
  async findOneForGuest(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        startsAt: true,
        endsAt: true,
        language: true,
        hasTimeline: true,
        hasChat: true,
        coverImageUrl: true,
        coverTemplate: true,
        profileImageUrl: true,
        instagramUrl: true,
        tiktokUrl: true,
        whatsappUrl: true,
        websiteUrl: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  // Get schedule/timeline for event
  async getSchedule(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { hasTimeline: true },
    });

    if (!event?.hasTimeline) {
      return [];
    }

    return this.prisma.scheduleItem.findMany({
      where: { eventId },
      orderBy: [{ startAt: 'asc' }, { sortOrder: 'asc' }],
    });
  }

  // Get media with filtering and pagination
  async getMedia(eventId: string, options: {
    filter?: string;
    user?: string;
    timeline?: string;
    order?: string;
    page?: number;
  }) {
    const { filter, user, timeline, order, page = 1 } = options;
    const limit = 20;
    const skip = (page - 1) * limit;

    let where: any = { eventId, isApproved: true };

    // Apply filters
    if (user) {
      where.uploaderName = { contains: user, mode: 'insensitive' };
    }

    if (timeline) {
      // Filter by timeline/schedule item (would need more complex logic)
      // For now, just filter by date range
    }

    // Determine order
    let orderBy: any = { createdAt: 'desc' };
    if (order === 'likes') {
      orderBy = { likesCount: 'desc' };
    } else if (order === 'downloads') {
      orderBy = { downloadsCount: 'desc' };
    } else if (order === 'date_asc') {
      orderBy = { createdAt: 'asc' };
    }

    const [media, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 3,
          },
          _count: {
            select: { comments: true, likes: true },
          },
        },
      }),
      this.prisma.media.count({ where }),
    ]);

    return {
      media,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get chat messages
  async getChat(eventId: string, limit: number = 50) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { hasChat: true },
    });

    if (!event?.hasChat) {
      return [];
    }

    return this.prisma.chatMessage.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

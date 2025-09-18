import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(eventId: string, createMessageDto: CreateChatMessageDto) {
    // Check if event has chat enabled
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { hasChat: true },
    });

    if (!event?.hasChat) {
      throw new Error('Chat is not enabled for this event');
    }

    const message = await this.prisma.chatMessage.create({
      data: {
        ...createMessageDto,
        eventId,
      },
    });

    // TODO: Emit WebSocket event for real-time updates
    // this.chatGateway.emitToEvent(eventId, 'new-message', message);

    return message;
  }

  async getMessages(eventId: string, options: { limit?: number; before?: string }) {
    const { limit = 50, before } = options;

    let where: any = { eventId };
    
    if (before) {
      where.createdAt = { lt: new Date(before) };
    }

    return this.prisma.chatMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

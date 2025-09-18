import { PrismaService } from '../prisma/prisma.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    sendMessage(eventId: string, createMessageDto: CreateChatMessageDto): Promise<{
        id: string;
        createdAt: Date;
        text: string;
        authorName: string;
        clientId: string;
        eventId: string;
    }>;
    getMessages(eventId: string, options: {
        limit?: number;
        before?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        text: string;
        authorName: string;
        clientId: string;
        eventId: string;
    }[]>;
}

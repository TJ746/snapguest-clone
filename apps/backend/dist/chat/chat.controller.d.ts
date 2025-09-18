import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(eventId: string, createMessageDto: CreateChatMessageDto): Promise<{
        id: string;
        createdAt: Date;
        text: string;
        authorName: string;
        clientId: string;
        eventId: string;
    }>;
    getMessages(eventId: string, limit?: string, before?: string): Promise<{
        id: string;
        createdAt: Date;
        text: string;
        authorName: string;
        clientId: string;
        eventId: string;
    }[]>;
}

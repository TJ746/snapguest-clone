import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':eventId/messages')
  sendMessage(@Param('eventId') eventId: string, @Body() createMessageDto: CreateChatMessageDto) {
    return this.chatService.sendMessage(eventId, createMessageDto);
  }

  @Get(':eventId/messages')
  getMessages(
    @Param('eventId') eventId: string,
    @Query('limit') limit?: string,
    @Query('before') before?: string,
  ) {
    return this.chatService.getMessages(eventId, {
      limit: limit ? parseInt(limit) : 50,
      before,
    });
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import type { ChatMessage } from './chat.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async addMessage(@Body() message: ChatMessage) {
    return this.chatService.addMessage(message);
  }
}

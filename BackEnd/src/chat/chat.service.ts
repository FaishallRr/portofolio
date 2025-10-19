import { Injectable } from '@nestjs/common';
import { db } from '../firebase/firebase-admin';
import { ChatMessage } from './chat.interface';

@Injectable()
export class ChatService {
  private chatRef = db.ref('chat_messages'); // HAPUS <ChatMessage>

  async getMessages(): Promise<ChatMessage[]> {
    const snapshot = await this.chatRef.once('value');
    const data = snapshot.val() as unknown; // jangan any

    if (!data || typeof data !== 'object') return [];

    const messages: ChatMessage[] = Object.entries(data).map(([id, value]) => {
      const val = value as Partial<ChatMessage>;
      return {
        id,
        user: val.user ?? 'unknown',
        message: val.message ?? '',
        timestamp: val.timestamp ?? Date.now(),
      };
    });

    return messages;
  }

  async addMessage(msg: ChatMessage): Promise<void> {
    await this.chatRef.push(msg);
  }
}

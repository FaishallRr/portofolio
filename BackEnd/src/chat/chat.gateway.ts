import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { db } from '../firebase/firebase-admin';
import { ChatMessage } from './chat.interface';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private chatRef = db.ref('chat_messages');

  afterInit() {
    // listen realtime DB
    this.chatRef.on('child_added', (snapshot) => {
      const message = snapshot.val() as ChatMessage;
      this.server.emit('newMessage', message); // kirim ke semua client
    });
  }
}

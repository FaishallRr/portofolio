export interface ChatMessage {
  id?: string; // optional, auto-generated
  user: string;
  message: string;
  timestamp: number;
}

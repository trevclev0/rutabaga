import { DurableObject } from 'cloudflare:workers';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

type ServerMessage =
  | { type: 'history'; messages: ChatMessage[] }
  | { type: 'message'; message: ChatMessage }
  | { type: 'user_joined'; username: string }
  | { type: 'user_left'; username: string };

type ClientMessage =
  | { type: 'message'; content: string; userId: string; username: string };

export class ChatRoom extends DurableObject {
  private sessions = new Map<WebSocket, { userId: string; username: string }>();
  private messages: ChatMessage[] = [];

  async fetch(_request: Request): Promise<Response> {
    const { 0: client, 1: server } = new WebSocketPair();
    this.ctx.acceptWebSocket(server); // Hibernation API — much more efficient
    return new Response(null, { status: 101, webSocket: client });
  }

  // Called when a WebSocket message arrives (supports hibernation)
  async webSocketMessage(_ws: WebSocket, message: string | ArrayBuffer) {
    const data: ClientMessage = JSON.parse(message as string);

    if (data.type === 'message') {
      const chatMessage: ChatMessage = {
        id: crypto.randomUUID(),
        userId: data.userId,
        username: data.username,
        content: data.content,
        timestamp: Date.now(),
      };

      this.messages.push(chatMessage);
      // Trim history to last 100 messages
      if (this.messages.length > 100) this.messages.shift();

      this.broadcast({ type: 'message', message: chatMessage });
    }
  }

  async webSocketOpen(ws: WebSocket) {
    // Send message history to new connection immediately
    this.send(ws, { type: 'history', messages: this.messages });
  }

  async webSocketClose(ws: WebSocket) {
    const session = this.sessions.get(ws);
    if (session) {
      this.sessions.delete(ws);
      this.broadcast({ type: 'user_left', username: session.username });
    }
  }

  private send(ws: WebSocket, message: ServerMessage) {
    ws.send(JSON.stringify(message));
  }

  private broadcast(message: ServerMessage) {
    for (const ws of this.ctx.getWebSockets()) {
      try {
        this.send(ws, message);
      } catch {
        // Session may have closed between getWebSockets() and send
      }
    }
  }
}

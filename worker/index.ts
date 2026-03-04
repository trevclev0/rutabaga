import { Hono } from 'hono';
import { ChatRoom } from './ChatRoom';

export { ChatRoom };

export interface Env {
  CHAT_ROOM: DurableObjectNamespace;
}

const app = new Hono<{ Bindings: Env }>();

// REST routes — Hono handles these fully
app.get('/api/rooms', async (c) => { console.log({ methodPath: 'GET /api/rooms', c }) });
app.post('/api/rooms', async (c) => { console.log({ methodPath: 'POST /api/rooms', c }) });

// WebSocket — must bypass Hono and forward to the DO
app.get('/chat/:roomId', async (c) => {
  if (c.req.header('Upgrade') !== 'websocket') {
    return c.text('Expected WebSocket upgrade', 426);
  }
  const roomId = c.req.param('roomId');
  const id = c.env.CHAT_ROOM.idFromName(roomId);
  const room = c.env.CHAT_ROOM.get(id);
  return room.fetch(c.req.raw); // forward the raw Request to the DO
});

export default app;

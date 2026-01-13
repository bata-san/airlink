import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { posts } from './routes/posts';
import { users } from './routes/users';
import { reactions } from './routes/reactions';
import { health } from './routes/health';
import type { Bindings } from './types';

const app = new Hono<{ Bindings: Bindings }>();

// CORS設定（Next.jsフロントエンドからのアクセス許可）
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://airlink.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// ルートマウント
app.route('/health', health);
app.route('/api/posts', posts);
app.route('/api/users', users);
app.route('/api/reactions', reactions);

// ルートパス
app.get('/', (c) => {
  return c.json({
    name: 'AirLink API',
    version: '0.1.0',
    status: 'running',
    endpoints: [
      'GET  /health',
      'GET  /api/posts',
      'POST /api/posts',
      'GET  /api/posts/:id',
      'DELETE /api/posts/:id',
      'GET  /api/users',
      'GET  /api/users/:id',
      'POST /api/reactions',
      'DELETE /api/reactions/:id',
    ],
  });
});

export default app;

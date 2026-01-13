import { Hono } from 'hono';
import type { Bindings } from '../types';

export const health = new Hono<{ Bindings: Bindings }>();

health.get('/', async (c) => {
  try {
    // D1接続テスト
    const result = await c.env.DB.prepare('SELECT 1 as ok').first();
    return c.json({
      status: 'healthy',
      database: result ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json({
      status: 'unhealthy',
      database: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

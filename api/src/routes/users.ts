import { Hono } from 'hono';
import type { Bindings, UserRow, User } from '../types';

export const users = new Hono<{ Bindings: Bindings }>();

// ユーザー行をAPIレスポンス形式に変換
function toUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    bio: row.bio,
    createdAt: row.created_at,
    followersCount: row.followers_count,
    followingCount: row.following_count,
  };
}

// 全ユーザー取得
users.get('/', async (c) => {
  const limit = Number(c.req.query('limit')) || 20;
  const offset = Number(c.req.query('offset')) || 0;

  const { results } = await c.env.DB.prepare(`
    SELECT * FROM users 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `).bind(limit, offset).all<UserRow>();

  return c.json({
    users: results.map(toUser),
    limit,
    offset,
  });
});

// 特定ユーザー取得
users.get('/:id', async (c) => {
  const id = c.req.param('id');

  const row = await c.env.DB.prepare(`
    SELECT * FROM users WHERE id = ?
  `).bind(id).first<UserRow>();

  if (!row) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json(toUser(row));
});

// ユーザー作成
users.post('/', async (c) => {
  const body = await c.req.json<{
    username: string;
    displayName: string;
    avatarUrl?: string;
    bio?: string;
  }>();

  if (!body.username || !body.displayName) {
    return c.json({ error: 'username and displayName are required' }, 400);
  }

  const id = `user-${crypto.randomUUID().slice(0, 8)}`;

  await c.env.DB.prepare(`
    INSERT INTO users (id, username, display_name, avatar_url, bio)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    id,
    body.username,
    body.displayName,
    body.avatarUrl || '',
    body.bio || ''
  ).run();

  const row = await c.env.DB.prepare(`
    SELECT * FROM users WHERE id = ?
  `).bind(id).first<UserRow>();

  return c.json(toUser(row!), 201);
});

// ユーザー名で検索
users.get('/by-username/:username', async (c) => {
  const username = c.req.param('username');

  const row = await c.env.DB.prepare(`
    SELECT * FROM users WHERE username = ?
  `).bind(username).first<UserRow>();

  if (!row) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json(toUser(row));
});

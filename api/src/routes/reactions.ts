import { Hono } from 'hono';
import type { Bindings, ReactionRow } from '../types';

export const reactions = new Hono<{ Bindings: Bindings }>();

// 投稿へのリアクション一覧取得
reactions.get('/post/:postId', async (c) => {
  const postId = c.req.param('postId');

  const { results } = await c.env.DB.prepare(`
    SELECT emoji, COUNT(*) as count
    FROM reactions
    WHERE post_id = ?
    GROUP BY emoji
    ORDER BY count DESC
  `).bind(postId).all<{ emoji: string; count: number }>();

  return c.json({
    postId,
    reactions: results,
  });
});

// リアクション追加
reactions.post('/', async (c) => {
  const body = await c.req.json<{
    postId: string;
    userId: string;
    emoji: string;
  }>();

  if (!body.postId || !body.userId || !body.emoji) {
    return c.json({ error: 'postId, userId, and emoji are required' }, 400);
  }

  // 投稿存在確認
  const post = await c.env.DB.prepare(`
    SELECT id FROM posts WHERE id = ?
  `).bind(body.postId).first();

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  // ユーザー存在確認
  const user = await c.env.DB.prepare(`
    SELECT id FROM users WHERE id = ?
  `).bind(body.userId).first();

  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  // 既にリアクション済みか確認
  const existing = await c.env.DB.prepare(`
    SELECT id FROM reactions WHERE post_id = ? AND user_id = ? AND emoji = ?
  `).bind(body.postId, body.userId, body.emoji).first();

  if (existing) {
    return c.json({ error: 'Already reacted with this emoji' }, 409);
  }

  const id = `reaction-${crypto.randomUUID().slice(0, 8)}`;

  await c.env.DB.prepare(`
    INSERT INTO reactions (id, post_id, user_id, emoji)
    VALUES (?, ?, ?, ?)
  `).bind(id, body.postId, body.userId, body.emoji).run();

  return c.json({
    id,
    postId: body.postId,
    userId: body.userId,
    emoji: body.emoji,
    createdAt: new Date().toISOString(),
  }, 201);
});

// リアクション削除
reactions.delete('/', async (c) => {
  const body = await c.req.json<{
    postId: string;
    userId: string;
    emoji: string;
  }>();

  if (!body.postId || !body.userId || !body.emoji) {
    return c.json({ error: 'postId, userId, and emoji are required' }, 400);
  }

  const existing = await c.env.DB.prepare(`
    SELECT id FROM reactions WHERE post_id = ? AND user_id = ? AND emoji = ?
  `).bind(body.postId, body.userId, body.emoji).first<{ id: string }>();

  if (!existing) {
    return c.json({ error: 'Reaction not found' }, 404);
  }

  await c.env.DB.prepare(`
    DELETE FROM reactions WHERE id = ?
  `).bind(existing.id).run();

  return c.json({ deleted: true, id: existing.id });
});

// リアクショントグル（あれば削除、なければ追加）
reactions.post('/toggle', async (c) => {
  const body = await c.req.json<{
    postId: string;
    userId: string;
    emoji: string;
  }>();

  if (!body.postId || !body.userId || !body.emoji) {
    return c.json({ error: 'postId, userId, and emoji are required' }, 400);
  }

  const existing = await c.env.DB.prepare(`
    SELECT id FROM reactions WHERE post_id = ? AND user_id = ? AND emoji = ?
  `).bind(body.postId, body.userId, body.emoji).first<{ id: string }>();

  if (existing) {
    // 削除
    await c.env.DB.prepare(`
      DELETE FROM reactions WHERE id = ?
    `).bind(existing.id).run();

    return c.json({ action: 'removed', id: existing.id });
  } else {
    // 追加
    const id = `reaction-${crypto.randomUUID().slice(0, 8)}`;

    await c.env.DB.prepare(`
      INSERT INTO reactions (id, post_id, user_id, emoji)
      VALUES (?, ?, ?, ?)
    `).bind(id, body.postId, body.userId, body.emoji).run();

    return c.json({
      action: 'added',
      id,
      postId: body.postId,
      userId: body.userId,
      emoji: body.emoji,
    }, 201);
  }
});

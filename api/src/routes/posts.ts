import { Hono } from 'hono';
import type { Bindings, PostRow, UserRow, User, Post, Reaction } from '../types';

export const posts = new Hono<{ Bindings: Bindings }>();

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

// 投稿のリアクション集計を取得
async function getReactions(db: D1Database, postId: string, currentUserId?: string): Promise<Reaction[]> {
  const { results } = await db.prepare(`
    SELECT emoji, COUNT(*) as count,
           MAX(CASE WHEN user_id = ? THEN 1 ELSE 0 END) as has_reacted
    FROM reactions
    WHERE post_id = ?
    GROUP BY emoji
    ORDER BY count DESC
  `).bind(currentUserId || '', postId).all<{ emoji: string; count: number; has_reacted: number }>();

  return results.map(r => ({
    emoji: r.emoji,
    count: r.count,
    hasReacted: r.has_reacted === 1,
  }));
}

// タイムライン取得（全投稿）
posts.get('/', async (c) => {
  const limit = Number(c.req.query('limit')) || 20;
  const offset = Number(c.req.query('offset')) || 0;
  const currentUserId = c.req.query('userId');

  const { results: postRows } = await c.env.DB.prepare(`
    SELECT p.*, u.id as user_id, u.username, u.display_name, u.avatar_url, 
           u.bio, u.created_at as user_created_at, u.followers_count, u.following_count
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.visibility = 'public'
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `).bind(limit, offset).all<PostRow & UserRow & { user_id: string; user_created_at: string }>();

  const posts: Post[] = await Promise.all(
    postRows.map(async (row) => {
      const reactions = await getReactions(c.env.DB, row.id, currentUserId);
      return {
        id: row.id,
        author: {
          id: row.user_id,
          username: row.username,
          displayName: row.display_name,
          avatarUrl: row.avatar_url,
          bio: row.bio,
          createdAt: row.user_created_at,
          followersCount: row.followers_count,
          followingCount: row.following_count,
        },
        content: row.content,
        createdAt: row.created_at,
        reactions,
        replyCount: row.reply_count,
        repostCount: row.repost_count,
        visibility: row.visibility,
        replyTo: row.reply_to || undefined,
      };
    })
  );

  return c.json({
    posts,
    limit,
    offset,
  });
});

// 特定投稿取得
posts.get('/:id', async (c) => {
  const id = c.req.param('id');
  const currentUserId = c.req.query('userId');

  const row = await c.env.DB.prepare(`
    SELECT p.*, u.id as user_id, u.username, u.display_name, u.avatar_url, 
           u.bio, u.created_at as user_created_at, u.followers_count, u.following_count
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.id = ?
  `).bind(id).first<PostRow & UserRow & { user_id: string; user_created_at: string }>();

  if (!row) {
    return c.json({ error: 'Post not found' }, 404);
  }

  const reactions = await getReactions(c.env.DB, row.id, currentUserId);

  const post: Post = {
    id: row.id,
    author: {
      id: row.user_id,
      username: row.username,
      displayName: row.display_name,
      avatarUrl: row.avatar_url,
      bio: row.bio,
      createdAt: row.user_created_at,
      followersCount: row.followers_count,
      followingCount: row.following_count,
    },
    content: row.content,
    createdAt: row.created_at,
    reactions,
    replyCount: row.reply_count,
    repostCount: row.repost_count,
    visibility: row.visibility,
    replyTo: row.reply_to || undefined,
  };

  return c.json(post);
});

// 投稿作成
posts.post('/', async (c) => {
  const body = await c.req.json<{
    authorId: string;
    content: string;
    visibility?: 'public' | 'followers' | 'private';
    replyTo?: string;
  }>();

  if (!body.authorId || !body.content) {
    return c.json({ error: 'authorId and content are required' }, 400);
  }

  if (body.content.length > 3000) {
    return c.json({ error: 'Content must be 3000 characters or less' }, 400);
  }

  // ユーザー存在確認
  const user = await c.env.DB.prepare(`
    SELECT * FROM users WHERE id = ?
  `).bind(body.authorId).first<UserRow>();

  if (!user) {
    return c.json({ error: 'Author not found' }, 404);
  }

  const id = `post-${crypto.randomUUID().slice(0, 8)}`;
  const visibility = body.visibility || 'public';

  await c.env.DB.prepare(`
    INSERT INTO posts (id, author_id, content, visibility, reply_to)
    VALUES (?, ?, ?, ?, ?)
  `).bind(id, body.authorId, body.content, visibility, body.replyTo || null).run();

  // 返信の場合、親投稿のreply_countを更新
  if (body.replyTo) {
    await c.env.DB.prepare(`
      UPDATE posts SET reply_count = reply_count + 1 WHERE id = ?
    `).bind(body.replyTo).run();
  }

  const post: Post = {
    id,
    author: toUser(user),
    content: body.content,
    createdAt: new Date().toISOString(),
    reactions: [],
    replyCount: 0,
    repostCount: 0,
    visibility,
    replyTo: body.replyTo,
  };

  return c.json(post, 201);
});

// 投稿削除
posts.delete('/:id', async (c) => {
  const id = c.req.param('id');

  const existing = await c.env.DB.prepare(`
    SELECT id, reply_to FROM posts WHERE id = ?
  `).bind(id).first<{ id: string; reply_to: string | null }>();

  if (!existing) {
    return c.json({ error: 'Post not found' }, 404);
  }

  // 返信だった場合、親投稿のreply_countを減らす
  if (existing.reply_to) {
    await c.env.DB.prepare(`
      UPDATE posts SET reply_count = reply_count - 1 WHERE id = ?
    `).bind(existing.reply_to).run();
  }

  await c.env.DB.prepare(`
    DELETE FROM posts WHERE id = ?
  `).bind(id).run();

  return c.json({ deleted: true, id });
});

// 特定ユーザーの投稿取得
posts.get('/user/:userId', async (c) => {
  const userId = c.req.param('userId');
  const limit = Number(c.req.query('limit')) || 20;
  const offset = Number(c.req.query('offset')) || 0;

  const { results: postRows } = await c.env.DB.prepare(`
    SELECT p.*, u.id as user_id, u.username, u.display_name, u.avatar_url, 
           u.bio, u.created_at as user_created_at, u.followers_count, u.following_count
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.author_id = ?
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `).bind(userId, limit, offset).all<PostRow & UserRow & { user_id: string; user_created_at: string }>();

  const posts: Post[] = await Promise.all(
    postRows.map(async (row) => {
      const reactions = await getReactions(c.env.DB, row.id);
      return {
        id: row.id,
        author: {
          id: row.user_id,
          username: row.username,
          displayName: row.display_name,
          avatarUrl: row.avatar_url,
          bio: row.bio,
          createdAt: row.user_created_at,
          followersCount: row.followers_count,
          followingCount: row.following_count,
        },
        content: row.content,
        createdAt: row.created_at,
        reactions,
        replyCount: row.reply_count,
        repostCount: row.repost_count,
        visibility: row.visibility,
        replyTo: row.reply_to || undefined,
      };
    })
  );

  return c.json({
    posts,
    limit,
    offset,
  });
});

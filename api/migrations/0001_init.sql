-- AirLink Database Schema
-- users: ユーザー情報
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0
);

-- posts: 投稿
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL,
    content TEXT NOT NULL,
    visibility TEXT DEFAULT 'public' CHECK(visibility IN ('public', 'followers', 'private')),
    reply_to TEXT,
    reply_count INTEGER DEFAULT 0,
    repost_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reply_to) REFERENCES posts(id) ON DELETE SET NULL
);

-- reactions: リアクション
CREATE TABLE IF NOT EXISTS reactions (
    id TEXT PRIMARY KEY,
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    emoji TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(post_id, user_id, emoji)
);

-- follows: フォロー関係
CREATE TABLE IF NOT EXISTS follows (
    id TEXT PRIMARY KEY,
    follower_id TEXT NOT NULL,
    following_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(follower_id, following_id)
);

-- channels: チャンネル
CREATE TABLE IF NOT EXISTS channels (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    icon TEXT DEFAULT '💬',
    is_private INTEGER DEFAULT 0,
    member_count INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
);

-- インデックス作成（クエリ高速化）
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_visibility ON posts(visibility);
CREATE INDEX IF NOT EXISTS idx_reactions_post ON reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

-- 初期ユーザー挿入
INSERT OR IGNORE INTO users (id, username, display_name, avatar_url, bio, followers_count, following_count) VALUES
('user-1', 'sakura_dev', '桜井 開発', 'https://api.dicebear.com/7.x/notionists/svg?seed=sakura', 'フロントエンド開発者。React/Next.js が得意です 🌸', 1284, 342),
('user-2', 'yuki_design', '雪村 デザイン', 'https://api.dicebear.com/7.x/notionists/svg?seed=yuki', 'UI/UXデザイナー。ミニマルなデザインが好き ❄️', 2156, 189),
('user-3', 'haru_cloud', '春田 クラウド', 'https://api.dicebear.com/7.x/notionists/svg?seed=haru', 'インフラエンジニア。Cloudflare推し ☁️', 876, 423),
('user-4', 'natsu_code', '夏目 コード', 'https://api.dicebear.com/7.x/notionists/svg?seed=natsu', 'バックエンド開発者。TypeScript愛好家 🌻', 1567, 521),
('user-5', 'aki_mobile', '秋山 モバイル', 'https://api.dicebear.com/7.x/notionists/svg?seed=aki', 'Flutterでアプリ作ってます 🍂', 943, 267);

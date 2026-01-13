export interface Bindings {
  DB: D1Database;
  ENVIRONMENT: string;
}

// Database row types
export interface UserRow {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  followers_count: number;
  following_count: number;
}

export interface PostRow {
  id: string;
  author_id: string;
  content: string;
  visibility: 'public' | 'followers' | 'private';
  reply_to: string | null;
  reply_count: number;
  repost_count: number;
  created_at: string;
}

export interface ReactionRow {
  id: string;
  post_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

// API response types
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  createdAt: string;
  followersCount: number;
  followingCount: number;
}

export interface Reaction {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  reactions: Reaction[];
  replyCount: number;
  repostCount: number;
  visibility: 'public' | 'followers' | 'private';
  replyTo?: string;
}

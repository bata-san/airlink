// Post Types
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
    images?: string[];
    replyTo?: string;
}

// Channel Types
export interface Channel {
    id: string;
    name: string;
    description: string;
    icon: string;
    memberCount: number;
    isPrivate: boolean;
}

// Notification Types
export interface Notification {
    id: string;
    type: 'like' | 'reply' | 'follow' | 'mention' | 'repost';
    actor: User;
    postId?: string;
    read: boolean;
    createdAt: string;
}

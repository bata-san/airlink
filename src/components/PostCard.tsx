'use client';

import { useState } from 'react';
import { Post as PostType } from '@/types';
import { formatRelativeTime } from '@/lib/dummy-data';
import styles from './PostCard.module.css';

interface PostCardProps {
    post: PostType;
}

export default function PostCard({ post }: PostCardProps) {
    const [reactions, setReactions] = useState(post.reactions);
    const [isHovered, setIsHovered] = useState(false);

    const handleReaction = (emoji: string) => {
        setReactions(prev =>
            prev.map(r =>
                r.emoji === emoji
                    ? {
                        ...r,
                        count: r.hasReacted ? r.count - 1 : r.count + 1,
                        hasReacted: !r.hasReacted,
                    }
                    : r
            )
        );
    };

    // MFM簡易パース（デモ用）
    const parseContent = (content: string) => {
        // ハッシュタグをリンクに変換
        const hashtagRegex = /#(\S+)/g;
        const parts = content.split(hashtagRegex);

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return (
                    <a key={index} href={`/tags/${part}`} className={styles.hashtag}>
                        #{part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <article
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ホバー時のインジケーター */}
            <div className={`${styles.indicator} ${isHovered ? styles.indicatorActive : ''}`} />

            <div className={styles.content}>
                {/* ヘッダー: アバター + ユーザー情報 */}
                <header className={styles.header}>
                    <div className={styles.avatar}>
                        <img src={post.author.avatarUrl} alt={post.author.displayName} />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.displayName}>{post.author.displayName}</div>
                        <div className={styles.meta}>
                            <span className={styles.username}>@{post.author.username}</span>
                            <span className={styles.separator}>·</span>
                            <time className={styles.timestamp}>{formatRelativeTime(post.createdAt)}</time>
                        </div>
                    </div>
                </header>

                {/* 本文 */}
                <div className={styles.body}>
                    <p className={styles.text}>{parseContent(post.content)}</p>
                </div>

                {/* リアクションバー */}
                <footer className={styles.footer}>
                    <div className={styles.reactions}>
                        {reactions.map(reaction => (
                            <button
                                key={reaction.emoji}
                                className={`${styles.reactionBtn} ${reaction.hasReacted ? styles.reactionActive : ''}`}
                                onClick={() => handleReaction(reaction.emoji)}
                            >
                                <span className={styles.emoji}>{reaction.emoji}</span>
                                <span className={styles.count}>{reaction.count}</span>
                            </button>
                        ))}
                        <button className={styles.addReaction}>+</button>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.actionBtn} title="返信">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                            </svg>
                            <span>{post.replyCount}</span>
                        </button>
                        <button className={styles.actionBtn} title="リポスト">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 1l4 4-4 4" />
                                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                                <path d="M7 23l-4-4 4-4" />
                                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                            </svg>
                            <span>{post.repostCount}</span>
                        </button>
                        <button className={styles.actionBtn} title="ブックマーク">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                        </button>
                    </div>
                </footer>
            </div>
        </article>
    );
}

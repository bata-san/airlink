'use client';

import { useState } from 'react';
import { Post } from '@/types';
import { dummyPosts } from '@/lib/dummy-data';
import PostCard from './PostCard';
import ComposeBox from './ComposeBox';
import styles from './Timeline.module.css';

export default function Timeline() {
    const [posts, setPosts] = useState<Post[]>(dummyPosts);
    const [activeTab, setActiveTab] = useState<'home' | 'local' | 'federated'>('home');

    const handleNewPost = (content: string) => {
        const newPost: Post = {
            id: `post-${Date.now()}`,
            author: {
                id: 'user-me',
                username: 'me',
                displayName: 'あなた',
                avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=me',
                bio: '',
                createdAt: new Date().toISOString(),
                followersCount: 0,
                followingCount: 0,
            },
            content,
            createdAt: new Date().toISOString(),
            reactions: [],
            replyCount: 0,
            repostCount: 0,
            visibility: 'public',
        };
        setPosts([newPost, ...posts]);
    };

    const tabs = [
        { id: 'home', label: 'ホーム', description: 'フォロー中' },
        { id: 'local', label: 'ローカル', description: 'このサーバー' },
        { id: 'federated', label: '連合', description: 'すべて' },
    ] as const;

    return (
        <div className={styles.timeline}>
            {/* ヘッダー */}
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <h1 className={styles.title}>タイムライン</h1>
                    <div className={styles.headerActions}>
                        <button className={styles.refreshBtn} title="更新">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 4 23 10 17 10" />
                                <polyline points="1 20 1 14 7 14" />
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* タブ */}
                <nav className={styles.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className={styles.tabLabel}>{tab.label}</span>
                            <span className={styles.tabMeta}>{tab.description}</span>
                        </button>
                    ))}
                </nav>
            </header>

            {/* 投稿作成 */}
            <div className={styles.compose}>
                <ComposeBox onPost={handleNewPost} />
            </div>

            {/* 投稿リスト */}
            <div className={styles.posts}>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* ロード中インジケーター（デモ用） */}
            <div className={styles.loader}>
                <span className={styles.loaderDot} />
                <span className={styles.loaderDot} />
                <span className={styles.loaderDot} />
            </div>
        </div>
    );
}

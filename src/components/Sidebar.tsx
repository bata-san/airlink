'use client';

import { useState } from 'react';
import { dummyChannels, dummyUsers } from '@/lib/dummy-data';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const [activeNav, setActiveNav] = useState('home');

    const navItems = [
        { id: 'home', label: 'ホーム', icon: '🏠' },
        { id: 'search', label: '検索', icon: '🔍' },
        { id: 'notifications', label: '通知', icon: '🔔', badge: 3 },
        { id: 'channels', label: 'チャンネル', icon: '💬' },
        { id: 'bookmarks', label: 'ブックマーク', icon: '📚' },
        { id: 'profile', label: 'プロフィール', icon: '👤' },
    ];

    return (
        <aside className={styles.sidebar}>
            {/* ロゴ */}
            <div className={styles.logo}>
                <span className={styles.logoIcon}>💨</span>
                <span className={styles.logoText}>AirLink</span>
            </div>

            {/* ナビゲーション */}
            <nav className={styles.nav}>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${activeNav === item.id ? styles.navActive : ''}`}
                        onClick={() => setActiveNav(item.id)}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>{item.label}</span>
                        {item.badge && <span className={styles.badge}>{item.badge}</span>}
                    </button>
                ))}
            </nav>

            {/* チャンネルリスト */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionLabel}>CHANNELS</span>
                </h3>
                <ul className={styles.channelList}>
                    {dummyChannels.map(channel => (
                        <li key={channel.id}>
                            <button className={styles.channelItem}>
                                <span className={styles.channelIcon}>{channel.icon}</span>
                                <span className={styles.channelName}>{channel.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* おすすめユーザー */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <span className={styles.sectionLabel}>SUGGESTED</span>
                </h3>
                <ul className={styles.userList}>
                    {dummyUsers.slice(0, 3).map(user => (
                        <li key={user.id}>
                            <a href={`/users/${user.username}`} className={styles.userItem}>
                                <div className={styles.userAvatar}>
                                    <img src={user.avatarUrl} alt={user.displayName} />
                                </div>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{user.displayName}</span>
                                    <span className={styles.userHandle}>@{user.username}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* フッター */}
            <footer className={styles.footer}>
                <span className={styles.version}>v0.1.0</span>
                <span className={styles.copyright}>© 2026 AirLink</span>
            </footer>
        </aside>
    );
}

import { User, Post, Channel } from '@/types';

// ダミーユーザーデータ
export const dummyUsers: User[] = [
    {
        id: 'user-1',
        username: 'sakura_dev',
        displayName: '桜井 開発',
        avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=sakura',
        bio: 'フロントエンド開発者。React/Next.js が得意です 🌸',
        createdAt: '2025-01-01T00:00:00Z',
        followersCount: 1284,
        followingCount: 342,
    },
    {
        id: 'user-2',
        username: 'yuki_design',
        displayName: '雪村 デザイン',
        avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=yuki',
        bio: 'UI/UXデザイナー。ミニマルなデザインが好き ❄️',
        createdAt: '2025-02-15T00:00:00Z',
        followersCount: 2156,
        followingCount: 189,
    },
    {
        id: 'user-3',
        username: 'haru_cloud',
        displayName: '春田 クラウド',
        avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=haru',
        bio: 'インフラエンジニア。Cloudflare推し ☁️',
        createdAt: '2025-03-20T00:00:00Z',
        followersCount: 876,
        followingCount: 423,
    },
    {
        id: 'user-4',
        username: 'natsu_code',
        displayName: '夏目 コード',
        avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=natsu',
        bio: 'バックエンド開発者。TypeScript愛好家 🌻',
        createdAt: '2025-04-10T00:00:00Z',
        followersCount: 1567,
        followingCount: 521,
    },
    {
        id: 'user-5',
        username: 'aki_mobile',
        displayName: '秋山 モバイル',
        avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=aki',
        bio: 'Flutterでアプリ作ってます 🍂',
        createdAt: '2025-05-05T00:00:00Z',
        followersCount: 943,
        followingCount: 267,
    },
];

// ダミー投稿データ
export const dummyPosts: Post[] = [
    {
        id: 'post-1',
        author: dummyUsers[0],
        content: `AirLinkの開発が順調に進んでいます！ 🚀

サーバーレスアーキテクチャの恩恵で、インフラコストを大幅に削減できそう。Cloudflare Workers + D1 の組み合わせは本当に素晴らしい。

#開発日記 #サーバーレス`,
        createdAt: '2026-01-13T22:30:00Z',
        reactions: [
            { emoji: '👍', count: 24, hasReacted: true },
            { emoji: '🚀', count: 18, hasReacted: false },
            { emoji: '❤️', count: 12, hasReacted: false },
        ],
        replyCount: 5,
        repostCount: 3,
        visibility: 'public',
    },
    {
        id: 'post-2',
        author: dummyUsers[1],
        content: `新しいデザインシステムを構築中。

マットな質感と40pxグリッドを基準にした座標系がポイント。影やぼかしを使わずに、色の明度差と極細ボーダーだけで奥行きを表現するのが挑戦。

ミニマルだけど、ちゃんと使いやすいUIを目指してます ✨`,
        createdAt: '2026-01-13T21:15:00Z',
        reactions: [
            { emoji: '✨', count: 31, hasReacted: false },
            { emoji: '👀', count: 15, hasReacted: true },
            { emoji: '💯', count: 9, hasReacted: false },
        ],
        replyCount: 8,
        repostCount: 7,
        visibility: 'public',
    },
    {
        id: 'post-3',
        author: dummyUsers[2],
        content: `Cloudflare D1のパフォーマンステスト結果が出た。

エッジでのクエリ実行が爆速すぎる。レイテンシが従来のRDSと比較して約70%削減。これはゲームチェンジャーだ。

次はDurable Objectsでリアルタイム通知を実装する予定 ⚡`,
        createdAt: '2026-01-13T20:00:00Z',
        reactions: [
            { emoji: '⚡', count: 42, hasReacted: false },
            { emoji: '🔥', count: 28, hasReacted: true },
            { emoji: '🎉', count: 16, hasReacted: false },
        ],
        replyCount: 12,
        repostCount: 15,
        visibility: 'public',
    },
    {
        id: 'post-4',
        author: dummyUsers[3],
        content: `型安全なAPI設計について考えてる。

HonoとZodを組み合わせると、エンドポイントからクライアントまで一貫した型チェックができる。開発体験が格段に向上するよね。

皆さんはバリデーションライブラリ何使ってますか？`,
        createdAt: '2026-01-13T18:45:00Z',
        reactions: [
            { emoji: '🤔', count: 19, hasReacted: false },
            { emoji: '💡', count: 14, hasReacted: false },
        ],
        replyCount: 23,
        repostCount: 4,
        visibility: 'public',
    },
    {
        id: 'post-5',
        author: dummyUsers[4],
        content: `FlutterでAirLinkのモバイル版プロトタイプ完成！

ワンソースでiOS/Android両対応できるのはやっぱり便利。
ネイティブに近い滑らかなアニメーションも実現できた 📱

来週からテスト配布始めます`,
        createdAt: '2026-01-13T17:30:00Z',
        reactions: [
            { emoji: '📱', count: 35, hasReacted: true },
            { emoji: '🎊', count: 22, hasReacted: false },
            { emoji: '👏', count: 18, hasReacted: false },
        ],
        replyCount: 9,
        repostCount: 11,
        visibility: 'public',
    },
    {
        id: 'post-6',
        author: dummyUsers[0],
        content: `MFM（文字装飾）機能の実装が楽しい。

$[shake 揺れる文字] や $[bounce 弾む文字] みたいな表現ができるようになった。遊び心のあるSNSにしたい 🎨`,
        createdAt: '2026-01-13T15:20:00Z',
        reactions: [
            { emoji: '🎨', count: 27, hasReacted: false },
            { emoji: '✨', count: 21, hasReacted: true },
            { emoji: '🙌', count: 13, hasReacted: false },
        ],
        replyCount: 6,
        repostCount: 8,
        visibility: 'public',
    },
];

// ダミーチャンネルデータ
export const dummyChannels: Channel[] = [
    {
        id: 'channel-1',
        name: '開発者雑談',
        description: '開発に関する雑談チャンネル',
        icon: '💬',
        memberCount: 156,
        isPrivate: false,
    },
    {
        id: 'channel-2',
        name: 'デザイン共有',
        description: 'デザインのアイデアや作品を共有',
        icon: '🎨',
        memberCount: 89,
        isPrivate: false,
    },
    {
        id: 'channel-3',
        name: 'お知らせ',
        description: '運営からの公式アナウンス',
        icon: '📢',
        memberCount: 342,
        isPrivate: false,
    },
    {
        id: 'channel-4',
        name: 'クラウド技術',
        description: 'Cloudflare, AWS, GCPなどの話題',
        icon: '☁️',
        memberCount: 67,
        isPrivate: false,
    },
];

// 時間フォーマットユーティリティ
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
        return 'たった今';
    } else if (diffMinutes < 60) {
        return `${diffMinutes}分前`;
    } else if (diffHours < 24) {
        return `${diffHours}時間前`;
    } else if (diffDays < 7) {
        return `${diffDays}日前`;
    } else {
        return date.toLocaleDateString('ja-JP', {
            month: 'short',
            day: 'numeric',
        });
    }
}

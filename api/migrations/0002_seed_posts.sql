-- Sample posts data
INSERT OR IGNORE INTO posts (id, author_id, content, visibility, created_at) VALUES
('post-1', 'user-1', 'AirLinkの開発が順調に進んでいます

サーバーレスアーキテクチャの恩恵で、インフラコストを大幅に削減できそう。Cloudflare Workers + D1 の組み合わせは本当に素晴らしい。

#開発日記 #サーバーレス', 'public', datetime('now', '-2 hours')),

('post-2', 'user-2', '新しいデザインシステムを構築中。

マットな質感と40pxグリッドを基準にした座標系がポイント。影やぼかしを使わずに、色の明度差と極細ボーダーだけで奥行きを表現するのが挑戦。

ミニマルだけど、ちゃんと使いやすいUIを目指してます', 'public', datetime('now', '-4 hours')),

('post-3', 'user-3', 'Cloudflare D1のパフォーマンステスト結果が出た。

エッジでのクエリ実行が爆速すぎる。レイテンシが従来のRDSと比較して約70%削減。これはゲームチェンジャーだ。

次はDurable Objectsでリアルタイム通知を実装する予定', 'public', datetime('now', '-6 hours')),

('post-4', 'user-4', '型安全なAPI設計について考えてる。

HonoとZodを組み合わせると、エンドポイントからクライアントまで一貫した型チェックができる。開発体験が格段に向上するよね。

皆さんはバリデーションライブラリ何使ってますか？', 'public', datetime('now', '-8 hours')),

('post-5', 'user-5', 'FlutterでAirLinkのモバイル版プロトタイプ完成

ワンソースでiOS/Android両対応できるのはやっぱり便利。
ネイティブに近い滑らかなアニメーションも実現できた

来週からテスト配布始めます', 'public', datetime('now', '-10 hours'));

-- Sample reactions
INSERT OR IGNORE INTO reactions (id, post_id, user_id, emoji) VALUES
('reaction-1', 'post-1', 'user-2', 'thumbs_up'),
('reaction-2', 'post-1', 'user-3', 'rocket'),
('reaction-3', 'post-2', 'user-1', 'sparkles'),
('reaction-4', 'post-2', 'user-4', 'eyes'),
('reaction-5', 'post-3', 'user-2', 'fire'),
('reaction-6', 'post-3', 'user-5', 'zap'),
('reaction-7', 'post-4', 'user-3', 'thinking'),
('reaction-8', 'post-5', 'user-1', 'mobile_phone');

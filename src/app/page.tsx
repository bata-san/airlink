import Sidebar from '@/components/Sidebar';
import Timeline from '@/components/Timeline';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.app}>
      {/* サイドバー */}
      <Sidebar />

      {/* メインコンテンツ */}
      <main className={styles.main}>
        <Timeline />
      </main>

      {/* 右サイドパネル */}
      <aside className={styles.rightPanel}>
        {/* 検索 */}
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="検索..."
          />
        </div>

        {/* トレンド */}
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>
            <span className={styles.widgetTitleText}>トレンド</span>
            <span className={styles.widgetMeta}>TRENDS</span>
          </h2>
          <ul className={styles.trendList}>
            <li className={styles.trendItem}>
              <span className={styles.trendTag}>#サーバーレス</span>
              <span className={styles.trendCount}>298 posts</span>
            </li>
            <li className={styles.trendItem}>
              <span className={styles.trendTag}>#開発日記</span>
              <span className={styles.trendCount}>156 posts</span>
            </li>
            <li className={styles.trendItem}>
              <span className={styles.trendTag}>#TypeScript</span>
              <span className={styles.trendCount}>124 posts</span>
            </li>
            <li className={styles.trendItem}>
              <span className={styles.trendTag}>#Cloudflare</span>
              <span className={styles.trendCount}>98 posts</span>
            </li>
            <li className={styles.trendItem}>
              <span className={styles.trendTag}>#Flutter</span>
              <span className={styles.trendCount}>87 posts</span>
            </li>
          </ul>
        </div>

        {/* サーバー情報 */}
        <div className={styles.widget}>
          <h2 className={styles.widgetTitle}>
            <span className={styles.widgetTitleText}>サーバー情報</span>
            <span className={styles.widgetMeta}>SERVER</span>
          </h2>
          <div className={styles.serverInfo}>
            <div className={styles.serverStat}>
              <span className={styles.statValue}>1,247</span>
              <span className={styles.statLabel}>ユーザー</span>
            </div>
            <div className={styles.serverStat}>
              <span className={styles.statValue}>15,832</span>
              <span className={styles.statLabel}>投稿</span>
            </div>
            <div className={styles.serverStat}>
              <span className={styles.statValue}>42</span>
              <span className={styles.statLabel}>チャンネル</span>
            </div>
          </div>
          <div className={styles.serverStatus}>
            <span className={styles.statusIndicator} />
            <span className={styles.statusText}>オンライン</span>
          </div>
        </div>

        {/* フッターリンク */}
        <footer className={styles.footer}>
          <a href="/about">About</a>
          <a href="/terms">利用規約</a>
          <a href="/privacy">プライバシー</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        </footer>
      </aside>
    </div>
  );
}

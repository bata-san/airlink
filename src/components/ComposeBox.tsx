'use client';

import { useState, useRef } from 'react';
import styles from './ComposeBox.module.css';

interface ComposeBoxProps {
    onPost?: (content: string) => void;
}

export default function ComposeBox({ onPost }: ComposeBoxProps) {
    const [content, setContent] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const maxLength = 500;
    const remaining = maxLength - content.length;
    const isOverLimit = remaining < 0;

    const handleSubmit = () => {
        if (content.trim() && !isOverLimit) {
            onPost?.(content);
            setContent('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        setContent(textarea.value);

        // Auto-resize textarea
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    return (
        <div className={`${styles.container} ${isFocused ? styles.focused : ''}`}>
            {/* アバター */}
            <div className={styles.avatar}>
                <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=me"
                    alt="あなた"
                />
            </div>

            <div className={styles.form}>
                {/* テキストエリア */}
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    placeholder="何を共有しますか？"
                    value={content}
                    onChange={handleInput}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />

                {/* アクションバー */}
                <div className={styles.actions}>
                    <div className={styles.tools}>
                        {/* 画像添付 */}
                        <button className={styles.toolBtn} title="画像を追加">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </button>

                        {/* 絵文字 */}
                        <button className={styles.toolBtn} title="絵文字">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                <line x1="15" y1="9" x2="15.01" y2="9" />
                            </svg>
                        </button>

                        {/* 公開範囲 */}
                        <button className={styles.toolBtn} title="公開範囲">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </button>
                    </div>

                    <div className={styles.submit}>
                        {/* 文字数カウンター */}
                        <span className={`${styles.counter} ${isOverLimit ? styles.overLimit : ''}`}>
                            {remaining}
                        </span>

                        {/* 投稿ボタン */}
                        <button
                            className={styles.postBtn}
                            onClick={handleSubmit}
                            disabled={!content.trim() || isOverLimit}
                        >
                            投稿する
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

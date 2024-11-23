'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('获取数据失败');
        }
        const data = await response.json();
        setVideos(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <main className={styles.container}>
      <h1>YouTube 播放量最高的视频</h1>
      <p>统计日期：2024年9月30日</p>
      
      {loading && <div>加载中...</div>}
      {error && <div className={styles.error}>{error}</div>}
      
      <ol className={styles.videoList}>
        {videos.map((video) => (
          <li key={video.id} className={styles.videoItem}>
            <img 
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title}
            />
            <div className={styles.videoInfo}>
              <a 
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {video.snippet.title}
              </a>
              <span className={styles.viewCount}>
                播放量：{parseInt(video.statistics.viewCount).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}

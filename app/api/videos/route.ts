import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      `part=snippet,statistics&` +
      `chart=mostPopular&` +
      `regionCode=US&` +
      `maxResults=10&` +
      `key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('YouTube API 请求失败');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('YouTube API 错误:', error);
    return NextResponse.json({ error: '获取视频数据失败' }, { status: 500 });
  }
} 
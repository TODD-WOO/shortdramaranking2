import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos';

export async function GET() {
  try {
    if (!YOUTUBE_API_KEY) {
      return NextResponse.json(
        { message: '未配置 YouTube API 密钥' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet,statistics&chart=mostPopular&regionCode=CN&maxResults=10&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'YouTube API 请求失败' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (_error) {
    console.error(_error);
    return NextResponse.json(
      { message: '服务器内部错误' },
      { status: 500 }
    );
  }
} 
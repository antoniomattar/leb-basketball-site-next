import { NextResponse } from 'next/server';

// Mock news data for now - in production you'd integrate with a news API
const MOCK_NEWS = [
  {
    id: '1',
    author: 'FIBA Asia',
    handle: '@fibaasia',
    avatar: '🏀',
    content:
      'Asia Cup 2025 is heating up! Lebanon showing incredible performance in Group A with their latest victory against Korea.',
    timestamp: '2025-08-04T10:30:00Z',
    likes: 145,
    retweets: 32,
    replies: 18,
    verified: true,
  },
  {
    id: '2',
    author: 'Basketball News',
    handle: '@basketballnews',
    avatar: '📰',
    content:
      'BREAKING: Australia advances to the next round with a dominant 89-72 victory over Qatar. Outstanding performance from their starting five!',
    timestamp: '2025-08-04T09:15:00Z',
    likes: 298,
    retweets: 89,
    replies: 45,
    verified: true,
  },
  {
    id: '3',
    author: 'Sports Central',
    handle: '@sportscentral',
    avatar: '🏆',
    content:
      'The point differentials in Group C are incredibly tight. China, Jordan, and India all within striking distance of qualification.',
    timestamp: '2025-08-04T08:45:00Z',
    likes: 87,
    retweets: 23,
    replies: 12,
    verified: false,
  },
  {
    id: '4',
    author: 'Asia Cup Official',
    handle: '@asiacup2025',
    avatar: '🥇',
    content:
      'Fan excitement is at an all-time high! Record attendance numbers across all venues. Thank you to all the passionate basketball fans! 🙌',
    timestamp: '2025-08-04T07:20:00Z',
    likes: 512,
    retweets: 156,
    replies: 78,
    verified: true,
  },
  {
    id: '5',
    author: 'Basketball Insider',
    handle: '@ballinsider',
    avatar: '🔍',
    content:
      'Key matchup alert: Philippines vs Iraq tomorrow could determine Group D standings. Both teams coming off impressive wins.',
    timestamp: '2025-08-04T06:30:00Z',
    likes: 134,
    retweets: 41,
    replies: 29,
    verified: false,
  },
];

export async function GET() {
  try {
    // In production, you would fetch from a real news API like:
    // - Twitter API v2
    // - News API
    // - RSS feeds
    // - Sports news APIs

    // Add some randomness to make it feel more dynamic
    const shuffledNews = [...MOCK_NEWS].sort(() => Math.random() - 0.5);

    return NextResponse.json(
      {
        success: true,
        data: shuffledNews,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=300', // 5 minutes cache
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch news',
        data: [],
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { gamesCache } from '@/lib/cache';

async function fetchFreshGamesData() {
  console.log('🔄 Fetching fresh games data for standings...');

  const res = await fetch(
    'https://v1.basketball.api-sports.io/games?league=301&season=2023',
    {
      headers: {
        'x-apisports-key': 'ca32db8848ed1dfc646c07a5137a64b1',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`API responded with status: ${res.status}`);
  }

  const data = await res.json();
  gamesCache.setCachedData(data); // Update cache for future requests
  console.log('✅ Fresh games data fetched and cached for standings');
  return data;
}

export async function GET() {
  try {
    // First, try to get games data from cache
    let gamesData = gamesCache.getCachedData();

    if (gamesData) {
      console.log('📊 Serving standings data from games cache');
      return NextResponse.json(gamesData, {
        headers: {
          'Cache-Control': 'public, max-age=1800', // 30 minutes client cache
          'X-Data-Source': 'GAMES_CACHE',
        },
      });
    }

    // If no cached data, check if we can fetch fresh data
    if (gamesCache.canMakeRequest()) {
      console.log('🔄 No cache available, fetching fresh data for standings');
      gamesData = await fetchFreshGamesData();

      return NextResponse.json(gamesData, {
        headers: {
          'Cache-Control': 'public, max-age=1800',
          'X-Data-Source': 'FRESH_FETCH',
        },
      });
    }

    // Rate limit reached and no cache available
    console.log('⚠️ Rate limit reached, no cache available for standings');
    return NextResponse.json(
      {
        error: 'Service temporarily unavailable',
        message: 'Daily API limit reached and no cached data available',
        retryAfter: '1 hour',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('💥 Standings API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch games data for standings',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

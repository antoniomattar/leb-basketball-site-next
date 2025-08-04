import { NextResponse } from 'next/server';
import { gamesCache } from '@/lib/cache';

async function fetchGamesFromAPI(): Promise<any> {
  console.log('🔄 Fetching fresh games data from API...');

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
  console.log('✅ Games data fetched successfully');
  return data;
}

export async function GET() {
  try {
    const cacheStats = gamesCache.getCacheStats();

    // Log cache status for debugging
    if (cacheStats) {
      console.log(
        `📊 Cache stats: Age: ${cacheStats.age}min, Requests today: ${cacheStats.requestCount}, Last fetch: ${cacheStats.lastFetch}`
      );
    }

    // Check if we should use cached data
    if (!gamesCache.shouldRefreshCache()) {
      console.log('⚡ Serving games data from cache');
      const cachedData = gamesCache.getCachedData();

      // Add cache headers to inform client about cached data
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, max-age=1800', // 30 minutes client cache
          'X-Cache-Status': 'HIT',
          'X-Cache-Age': cacheStats?.age.toString() || '0',
        },
      });
    }

    // Check rate limiting
    if (!gamesCache.canMakeRequest()) {
      console.log('⚠️ Daily API limit reached, serving stale cache');
      const staleData = gamesCache.getCachedData();

      if (staleData) {
        return NextResponse.json(staleData, {
          headers: {
            'Cache-Control': 'public, max-age=3600', // 1 hour client cache for stale data
            'X-Cache-Status': 'STALE',
            'X-Rate-Limit': 'EXCEEDED',
          },
        });
      } else {
        return NextResponse.json(
          {
            error: 'Service temporarily unavailable - daily API limit reached',
            retryAfter: '1 hour',
          },
          { status: 503 }
        );
      }
    }

    // Fetch fresh data
    try {
      const freshData = await fetchGamesFromAPI();
      gamesCache.setCachedData(freshData);

      const newStats = gamesCache.getCacheStats();
      console.log(
        `📈 Cache updated. Requests today: ${newStats?.requestCount || 0}`
      );

      return NextResponse.json(freshData, {
        headers: {
          'Cache-Control': 'public, max-age=1800', // 30 minutes client cache
          'X-Cache-Status': 'MISS',
          'X-Requests-Today': newStats?.requestCount.toString() || '1',
        },
      });
    } catch (fetchError) {
      console.error('❌ Failed to fetch fresh data:', fetchError);

      // If we have cached data, serve it even if fresh fetch failed
      const fallbackData = gamesCache.getCachedData();
      if (fallbackData) {
        console.log('🔄 Serving stale cache due to fetch error');
        return NextResponse.json(fallbackData, {
          headers: {
            'Cache-Control': 'public, max-age=3600',
            'X-Cache-Status': 'STALE-ERROR',
            'X-Error': 'Fresh fetch failed',
          },
        });
      }

      throw fetchError; // Re-throw if no cache available
    }
  } catch (error) {
    console.error('💥 Games API critical error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch games data',
        message: 'Please try again later',
      },
      { status: 500 }
    );
  }
}

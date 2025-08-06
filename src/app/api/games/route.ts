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
        `📊 Cache stats: Age: ${cacheStats.age}min, Requests today: ${
          cacheStats.requestCount
        }/${cacheStats.remaining + cacheStats.requestCount}, Last fetch: ${
          cacheStats.lastFetch
        }`
      );
    } else {
      console.log('💭 No cache data found, will fetch fresh data');
    }

    // Check if we should use cached data
    if (!gamesCache.shouldRefreshCache()) {
      console.log('⚡ Serving games data from cache');
      const cachedData = gamesCache.getCachedData();

      if (cachedData) {
        // Add cache headers to inform client about cached data
        return NextResponse.json(cachedData, {
          headers: {
            'Cache-Control':
              'public, max-age=1800, stale-while-revalidate=3600', // 30 min cache, 1 hour stale
            'X-Cache-Status': 'HIT',
            'X-Cache-Age': cacheStats?.age.toString() || '0',
            'X-Requests-Remaining': cacheStats?.remaining.toString() || '0',
          },
        });
      }
    }

    // Check rate limiting
    if (!gamesCache.canMakeRequest()) {
      console.log('⚠️ Daily API limit reached, serving stale cache');
      const staleData = gamesCache.getCachedData();

      if (staleData) {
        return NextResponse.json(staleData, {
          headers: {
            'Cache-Control':
              'public, max-age=3600, stale-while-revalidate=7200', // 1 hour cache, 2 hours stale
            'X-Cache-Status': 'STALE',
            'X-Rate-Limit': 'EXCEEDED',
            'X-Requests-Remaining': '0',
          },
        });
      } else {
        return NextResponse.json(
          {
            error: 'Service temporarily unavailable - daily API limit reached',
            retryAfter: '6 hours',
            message: 'Please try again later or check back tomorrow',
          },
          {
            status: 503,
            headers: {
              'Retry-After': '21600', // 6 hours in seconds
            },
          }
        );
      }
    }

    // Fetch fresh data
    console.log('🔄 Attempting to fetch fresh data from API...');
    try {
      const freshData = await fetchGamesFromAPI();
      gamesCache.setCachedData(freshData);

      const newStats = gamesCache.getCacheStats();
      console.log(
        `📈 Cache updated. Requests today: ${
          newStats?.requestCount || 0
        }, Remaining: ${newStats?.remaining || 0}`
      );

      return NextResponse.json(freshData, {
        headers: {
          'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600', // 30 min cache, 1 hour stale
          'X-Cache-Status': 'MISS',
          'X-Requests-Today': newStats?.requestCount.toString() || '1',
          'X-Requests-Remaining': newStats?.remaining.toString() || '0',
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
            'Cache-Control':
              'public, max-age=1800, stale-while-revalidate=3600',
            'X-Cache-Status': 'STALE-ERROR',
            'X-Error': 'Fresh fetch failed',
            'X-Requests-Remaining': cacheStats?.remaining.toString() || '0',
          },
        });
      }

      // No cache available, return error
      return NextResponse.json(
        {
          error: 'Failed to fetch games data',
          message: 'External API unavailable and no cached data found',
          retryAfter: '30 minutes',
        },
        {
          status: 503,
          headers: {
            'Retry-After': '1800', // 30 minutes
          },
        }
      );
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

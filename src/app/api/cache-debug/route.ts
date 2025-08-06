import { NextResponse } from 'next/server';
import { gamesCache, CACHE_CONFIG } from '@/lib/cache';

export async function GET() {
  try {
    const stats = gamesCache.getCacheStats();
    const hasCache = gamesCache.getCachedData() !== null;

    return NextResponse.json({
      cacheEnabled: true,
      hasData: hasCache,
      config: {
        maxDailyRequests: CACHE_CONFIG.MAX_DAILY_REQUESTS,
        cacheDurationHours: CACHE_CONFIG.DURATION / (1000 * 60 * 60),
        refreshHour: CACHE_CONFIG.REFRESH_HOUR,
      },
      stats: stats || {
        age: 0,
        requestCount: 0,
        lastFetch: 'never',
        remaining: CACHE_CONFIG.MAX_DAILY_REQUESTS,
      },
      status: {
        shouldRefresh: gamesCache.shouldRefreshCache(),
        canMakeRequest: gamesCache.canMakeRequest(),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Cache debug error:', error);
    return NextResponse.json(
      { error: 'Failed to get cache status' },
      { status: 500 }
    );
  }
}

// Force refresh cache (for testing)
export async function POST() {
  try {
    gamesCache.forceRefresh();
    return NextResponse.json({
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cache clear error:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}

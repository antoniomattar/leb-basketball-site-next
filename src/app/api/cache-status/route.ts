import { NextResponse } from 'next/server';
import { gamesCache, CACHE_CONFIG } from '@/lib/cache';

export async function GET() {
  try {
    const stats = gamesCache.getCacheStats();
    const now = new Date();

    if (!stats) {
      return NextResponse.json({
        status: 'empty',
        message: 'No cache data available',
        timestamp: now.toISOString(),
      });
    }

    const shouldRefresh = gamesCache.shouldRefreshCache();
    const canRequest = gamesCache.canMakeRequest();

    return NextResponse.json({
      status: 'active',
      cache: {
        ageMinutes: stats.age,
        ageHours: Math.floor(stats.age / 60),
        lastFetch: stats.lastFetch,
        isStale: stats.age > CACHE_CONFIG.DURATION / 1000 / 60,
      },
      requests: {
        dailyCount: stats.requestCount,
        dailyLimit: CACHE_CONFIG.MAX_DAILY_REQUESTS,
        remaining: CACHE_CONFIG.MAX_DAILY_REQUESTS - stats.requestCount,
        canMakeRequest: canRequest,
      },
      refresh: {
        shouldRefresh,
        nextRefreshTime: CACHE_CONFIG.REFRESH_HOUR,
        currentHour: now.getHours(),
      },
      config: {
        cacheDurationHours: CACHE_CONFIG.DURATION / 1000 / 60 / 60,
        refreshHour: CACHE_CONFIG.REFRESH_HOUR,
        maxDailyRequests: CACHE_CONFIG.MAX_DAILY_REQUESTS,
      },
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Cache status error:', error);
    return NextResponse.json(
      { error: 'Failed to get cache status' },
      { status: 500 }
    );
  }
}

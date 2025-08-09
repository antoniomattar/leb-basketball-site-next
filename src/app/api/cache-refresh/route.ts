import { NextResponse } from 'next/server';
import { gamesCache } from '@/lib/cache';

export async function POST() {
  try {
    console.log('🔄 Manual cache refresh requested');
    
    // Force refresh the cache
    gamesCache.forceRefresh();
    
    // Fetch fresh data
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

    const freshData = await res.json();
    gamesCache.setCachedData(freshData);

    const stats = gamesCache.getCacheStats();
    
    return NextResponse.json({
      success: true,
      message: 'Cache refreshed successfully',
      stats: stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Cache refresh failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh cache',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = gamesCache.getCacheStats();
    const cachedData = gamesCache.getCachedData();
    
    return NextResponse.json({
      cacheStats: stats,
      hasCachedData: !!cachedData,
      cacheSize: cachedData ? JSON.stringify(cachedData).length : 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to get cache info',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

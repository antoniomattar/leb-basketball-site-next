// Cache management utilities for games data
interface CacheEntry {
  data: any;
  timestamp: number;
  lastFetch: string; // Date string YYYY-MM-DD
  requestCount: number; // Daily request counter
}

// Configuration
export const CACHE_CONFIG = {
  DURATION: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
  REFRESH_HOUR: 14, // 2 PM - afternoon refresh time
  MAX_DAILY_REQUESTS: 100,
  CACHE_KEY: 'games_cache_v1',
};

export class GamesCacheManager {
  private cache: CacheEntry | null = null;

  constructor() {
    // In a real implementation, you'd load from persistent storage here
  }

  shouldRefreshCache(): boolean {
    if (!this.cache) return true;

    const now = new Date();
    const cacheAge = now.getTime() - this.cache.timestamp;
    const today = now.toISOString().split('T')[0];

    // Reset daily counter if it's a new day
    if (this.cache.lastFetch !== today) {
      this.cache.requestCount = 0;
    }

    // If cache is older than configured duration, refresh
    if (cacheAge > CACHE_CONFIG.DURATION) return true;

    // If it's afternoon and we haven't fetched today, refresh
    if (
      now.getHours() >= CACHE_CONFIG.REFRESH_HOUR &&
      this.cache.lastFetch !== today
    ) {
      return true;
    }

    return false;
  }

  canMakeRequest(): boolean {
    if (!this.cache) return true;

    const today = new Date().toISOString().split('T')[0];

    // Reset counter for new day
    if (this.cache.lastFetch !== today) {
      return true;
    }

    return this.cache.requestCount < CACHE_CONFIG.MAX_DAILY_REQUESTS;
  }

  getCachedData(): any | null {
    return this.cache?.data || null;
  }

  setCachedData(data: any): void {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Increment request count if same day, otherwise reset
    const requestCount =
      this.cache?.lastFetch === today ? this.cache.requestCount + 1 : 1;

    this.cache = {
      data,
      timestamp: now.getTime(),
      lastFetch: today,
      requestCount,
    };
  }

  getCacheStats(): {
    age: number;
    requestCount: number;
    lastFetch: string;
  } | null {
    if (!this.cache) return null;

    const now = new Date();
    const age = now.getTime() - this.cache.timestamp;

    return {
      age: Math.floor(age / 1000 / 60), // Age in minutes
      requestCount: this.cache.requestCount,
      lastFetch: this.cache.lastFetch,
    };
  }
}

// Global cache instance
export const gamesCache = new GamesCacheManager();

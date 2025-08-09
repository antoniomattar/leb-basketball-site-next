// Cache management utilities for games data
interface CacheEntry {
  data: any;
  timestamp: number;
  lastFetch: string; // Date string YYYY-MM-DD
  requestCount: number; // Daily request counter
}

// Configuration
export const CACHE_CONFIG = {
  DURATION: 2 * 60 * 60 * 1000, // 2 hours in milliseconds (shorter for live sports)
  REFRESH_HOUR: 12, // 12 PM - noon refresh time
  MAX_DAILY_REQUESTS: 90, // Reduced to be more conservative
  CACHE_KEY: 'games_cache_v3', // Updated cache key
};

// Global in-memory cache as fallback
let memoryCache: CacheEntry | null = null;

export class GamesCacheManager {
  private cache: CacheEntry | null = null;

  constructor() {
    this.loadCache();
  }

  private loadCache(): void {
    // First try to load from memory cache (for same process)
    if (memoryCache) {
      this.cache = memoryCache;
      return;
    }

    // Try to load from environment variables (for serverless persistence)
    try {
      const envCache = process.env.GAMES_CACHE_DATA;
      if (envCache) {
        const parsed = JSON.parse(envCache);
        const cacheAge = Date.now() - parsed.timestamp;

        // Only use env cache if it's less than 24 hours old
        if (cacheAge < 24 * 60 * 60 * 1000) {
          this.cache = parsed;
          memoryCache = parsed;
        }
      }
    } catch (error) {
      console.log('No valid cache found in environment');
    }
  }

  private saveCache(): void {
    // Save to memory cache
    memoryCache = this.cache;

    // Save to environment (in serverless, this persists for the function lifetime)
    if (this.cache) {
      try {
        process.env.GAMES_CACHE_DATA = JSON.stringify(this.cache);
      } catch (error) {
        console.log('Failed to save cache to environment');
      }
    }
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
      this.cache.lastFetch !== today &&
      this.cache.requestCount < CACHE_CONFIG.MAX_DAILY_REQUESTS
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
      this.cache?.lastFetch === today ? (this.cache.requestCount || 0) + 1 : 1;

    this.cache = {
      data,
      timestamp: now.getTime(),
      lastFetch: today,
      requestCount,
    };

    this.saveCache();
  }

  getCacheStats(): {
    age: number;
    requestCount: number;
    lastFetch: string;
    remaining: number;
  } | null {
    if (!this.cache) return null;

    const now = new Date();
    const age = now.getTime() - this.cache.timestamp;
    const today = now.toISOString().split('T')[0];

    // Adjust request count for new day
    const requestCount =
      this.cache.lastFetch === today ? this.cache.requestCount : 0;

    return {
      age: Math.floor(age / 1000 / 60), // Age in minutes
      requestCount,
      lastFetch: this.cache.lastFetch,
      remaining: CACHE_CONFIG.MAX_DAILY_REQUESTS - requestCount,
    };
  }

  // Force refresh cache (for testing)
  forceRefresh(): void {
    this.cache = null;
    memoryCache = null;
    delete process.env.GAMES_CACHE_DATA;
  }
}

// Global cache instance
export const gamesCache = new GamesCacheManager();

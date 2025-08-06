import { NextResponse } from 'next/server';

interface TwitterPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  verified: boolean;
}

// Function to fetch from RSSHub (reliable RSS service)
async function fetchFromRSSHub(handle: string): Promise<TwitterPost[]> {
  try {
    const username = handle.replace('@', '');
    // Using RSSHub Twitter RSS feed
    const rsshubUrl = `https://rsshub.app/twitter/user/${username}`;
    
    const response = await fetch(rsshubUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const rssText = await response.text();
    const posts: TwitterPost[] = [];
    
    // Simple regex parsing for RSS items
    const itemPattern = /<item>([\s\S]*?)<\/item>/g;
    let match;
    let count = 0;

    while ((match = itemPattern.exec(rssText)) !== null && count < 5) {
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/);
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      
      if (titleMatch && linkMatch && pubDateMatch) {
        const content = titleMatch[1].trim();
        const postId = `${username}-${Date.now()}-${count}`;
        
        posts.push({
          id: postId,
          author: handle === '@FIBAAsiaCup' ? 'FIBA Asia Cup' : 'BasketPals',
          handle: handle,
          avatar: handle === '@FIBAAsiaCup' ? '🏀' : '🏆',
          content: content.length > 280 ? content.substring(0, 277) + '...' : content,
          timestamp: new Date(pubDateMatch[1]).toISOString(),
          likes: Math.floor(Math.random() * 1000) + 100,
          retweets: Math.floor(Math.random() * 200) + 20,
          replies: Math.floor(Math.random() * 100) + 10,
          verified: true,
        });
        count++;
      }
    }

    return posts;
  } catch (error) {
    console.error(`RSSHub fetch error for ${handle}:`, error);
    return [];
  }
}

// Fallback using Nitter RSS
async function fetchFromNitter(handle: string): Promise<TwitterPost[]> {
  try {
    const username = handle.replace('@', '');
    const nitterInstances = [
      'nitter.net',
      'nitter.it',
      'nitter.privacydev.net'
    ];
    
    for (const instance of nitterInstances) {
      try {
        const nitterUrl = `https://${instance}/${username}/rss`;
        
        const response = await fetch(nitterUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
          },
        });

        if (response.ok) {
          const rssText = await response.text();
          const posts: TwitterPost[] = [];
          
          // Extract items from RSS
          const itemPattern = /<item>([\s\S]*?)<\/item>/g;
          let match;
          let count = 0;

          while ((match = itemPattern.exec(rssText)) !== null && count < 3) {
            const itemContent = match[1];
            
            const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
            const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
            const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
            
            if (titleMatch && linkMatch && pubDateMatch) {
              const content = titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1').trim();
              const postId = `${username}-nitter-${count}`;
              
              posts.push({
                id: postId,
                author: handle === '@FIBAAsiaCup' ? 'FIBA Asia Cup' : 'BasketPals',
                handle: handle,
                avatar: handle === '@FIBAAsiaCup' ? '🏀' : '🏆',
                content: content.length > 280 ? content.substring(0, 277) + '...' : content,
                timestamp: new Date(pubDateMatch[1]).toISOString(),
                likes: Math.floor(Math.random() * 500) + 50,
                retweets: Math.floor(Math.random() * 100) + 10,
                replies: Math.floor(Math.random() * 50) + 5,
                verified: true,
              });
              count++;
            }
          }

          if (posts.length > 0) {
            return posts;
          }
        }
      } catch (instanceError) {
        console.log(`Failed to fetch from ${instance}, trying next...`);
        continue;
      }
    }
    
    return [];
  } catch (error) {
    console.error(`Nitter fetch error for ${handle}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const accounts = ['@FIBAAsiaCup', '@BasketPals'];
    const allPosts: TwitterPost[] = [];

    // Try to fetch from each account
    for (const account of accounts) {
      try {
        // Try RSSHub first
        let posts = await fetchFromRSSHub(account);
        
        // If RSSHub fails, try Nitter
        if (posts.length === 0) {
          posts = await fetchFromNitter(account);
        }
        
        allPosts.push(...posts);
      } catch (error) {
        console.error(`Failed to fetch from ${account}:`, error);
      }
    }

    // If no real posts were fetched, return fallback content
    if (allPosts.length === 0) {
      const fallbackPosts: TwitterPost[] = [
        {
          id: 'fallback-1',
          author: 'FIBA Asia Cup',
          handle: '@FIBAAsiaCup',
          avatar: '🏀',
          content: 'Asia Cup 2025 is underway! Follow us for the latest updates and scores. #AsiaBasketball #FIBAAsiaCup',
          timestamp: new Date().toISOString(),
          likes: 234,
          retweets: 67,
          replies: 23,
          verified: true,
        },
        {
          id: 'fallback-2',
          author: 'BasketPals',
          handle: '@BasketPals',
          avatar: '🏆',
          content: 'The talent level at Asia Cup 2025 is incredible! Some amazing games happening right now. 🏀 #Basketball',
          timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
          likes: 156,
          retweets: 34,
          replies: 12,
          verified: true,
        },
        {
          id: 'fallback-3',
          author: 'FIBA Asia Cup',
          handle: '@FIBAAsiaCup',
          avatar: '🏀',
          content: 'Reminder: All games are being streamed live! Check our website for streaming details. 📺 #LiveBasketball',
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          likes: 89,
          retweets: 23,
          replies: 8,
          verified: true,
        },
      ];
      
      return NextResponse.json({
        success: true,
        data: fallbackPosts,
        timestamp: new Date().toISOString(),
        source: 'fallback',
        message: 'Using fallback content due to API limitations',
      });
    }

    // Sort by timestamp (newest first)
    allPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json(
      {
        success: true,
        data: allPosts.slice(0, 8), // Return top 8 posts
        timestamp: new Date().toISOString(),
        source: 'live',
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=600', // 10 minutes cache for live data
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('News API error:', error);
    
    // Return minimal fallback on error
    return NextResponse.json(
      {
        success: false,
        error: 'Service temporarily unavailable',
        data: [
          {
            id: 'error-fallback',
            author: 'Asia Cup Updates',
            handle: '@AsiaBasketball',
            avatar: '🏀',
            content: 'News service temporarily unavailable. Please check back later for live updates! 🏆',
            timestamp: new Date().toISOString(),
            likes: 0,
            retweets: 0,
            replies: 0,
            verified: true,
          },
        ],
        timestamp: new Date().toISOString(),
        source: 'error-fallback',
      },
      { status: 200 }
    );
  }
}

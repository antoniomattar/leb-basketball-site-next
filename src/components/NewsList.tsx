'use client';

import React, { useEffect, useState } from 'react';

interface NewsItem {
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

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();

        if (data.success) {
          setNews(data.data);
        } else {
          throw new Error(data.error || 'Failed to load news');
        }
      } catch (e) {
        console.error('News fetch error:', e);
        setError('Failed to load latest news. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();

    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now.getTime() - postTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}h`;
    } else if (diffMins > 0) {
      return `${diffMins}m`;
    } else {
      return 'now';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div id="news" className="my-8">
        <h1 className="m-6 text-center font-mono text-4xl font-bold">
          Latest Basketball News
        </h1>
        <div className="text-center font-mono text-green-700">
          Loading latest news...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="news" className="my-8">
        <h1 className="m-6 text-center font-mono text-4xl font-bold">
          Latest Basketball News
        </h1>
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div id="news" className="my-8">
      <h1 className="m-6 text-center font-mono text-4xl font-bold">
        Latest Basketball News
      </h1>

      <div className="mx-auto max-w-2xl px-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="mb-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-2xl">{item.avatar}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {item.author}
                    </p>
                    {item.verified && (
                      <span className="text-blue-500" title="Verified">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-gray-500">
                    {item.handle}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="text-sm text-gray-500">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-base leading-relaxed text-gray-900">
                {item.content}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 transition-colors hover:text-blue-500">
                  <span>💬</span>
                  <span className="text-sm">{formatNumber(item.replies)}</span>
                </button>

                <button className="flex items-center space-x-2 transition-colors hover:text-green-500">
                  <span>🔄</span>
                  <span className="text-sm">{formatNumber(item.retweets)}</span>
                </button>

                <button className="flex items-center space-x-2 transition-colors hover:text-red-500">
                  <span>❤️</span>
                  <span className="text-sm">{formatNumber(item.likes)}</span>
                </button>
              </div>

              <button className="transition-colors hover:text-gray-700">
                <span>📤</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="font-mono text-sm text-gray-500">
          🔄 Updates every 5 minutes • Follow @asiacup2025 for live updates
        </p>
      </div>
    </div>
  );
}

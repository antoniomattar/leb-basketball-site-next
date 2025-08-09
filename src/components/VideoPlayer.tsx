'use client';

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  videoUrl: string;
  mediaType?: 'hls' | 'iframe' | 'twitch';
}

export default function VideoPlayer({
  videoUrl,
  mediaType = 'hls',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Function to convert OK.ru URL to embed format
  const getEmbedUrl = (url: string): string => {
    if (url.includes('ok.ru/video/')) {
      const videoId = url.split('video/')[1];
      return `https://ok.ru/videoembed/${videoId}`;
    }
    return url;
  };

  useEffect(() => {
    if (mediaType !== 'hls') return;

    const video = videoRef.current;
    if (!video) return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);

    if (isIos) {
      video.src = videoUrl;
    } else {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
      } else {
        video.src = videoUrl;
        console.log('Hls.js is not supported');
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl, mediaType]);

  // Handle pure Twitch channel (no iframe, direct link)
  if (mediaType === 'twitch') {
    const channelName = videoUrl.includes('twitch.tv/')
      ? videoUrl.split('twitch.tv/')[1]
      : videoUrl;

    return (
      <div className="w-full">
        <div className="flex h-[500px] min-h-[500px] w-full items-center justify-center rounded-lg bg-gray-900">
          <div className="p-8 text-center text-white">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-purple-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
            </svg>
            <h3 className="mb-2 text-xl font-bold">Watch on Twitch</h3>
            <p className="mb-4 text-gray-300">Channel: {channelName}</p>
            <button
              onClick={() =>
                window.open(`https://twitch.tv/${channelName}`, '_blank')
              }
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
              </svg>
              Open Twitch Stream
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mediaType === 'iframe') {
    const isTwitchUrl = videoUrl.includes('player.twitch.tv');
    const channelName = isTwitchUrl
      ? videoUrl.match(/channel=([^&]*)/)?.[1] || 'unknown'
      : null;

    return (
      <div className="w-full">
        <div className="relative h-[500px] min-h-[500px] w-full rounded-lg bg-gray-900">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="h-full w-full rounded-lg"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            title="Live Stream"
          />
          {isTwitchUrl && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900 bg-opacity-75 opacity-0 transition-opacity hover:opacity-100">
              <button
                onClick={() =>
                  window.open(`https://twitch.tv/${channelName}`, '_blank')
                }
                className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                </svg>
                Open on Twitch
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-[500px] min-h-[500px] w-full">
        <video
          ref={videoRef}
          controls
          poster="https://i.ytimg.com/vi/AUR179cxRzk/maxresdefault.jpg"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

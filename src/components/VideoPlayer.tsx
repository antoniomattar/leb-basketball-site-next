'use client';

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  videoUrl: string;
  mediaType?: 'hls' | 'iframe';
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

  if (mediaType === 'iframe') {
    return (
      <div className="w-full">
        <div className="aspect-video w-full">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="h-full w-full rounded-lg"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            title="Live Stream"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="aspect-video w-full">
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

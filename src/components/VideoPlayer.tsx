'use client';

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer(props: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);

    if (isIos) {
      video.src = props.videoUrl;
    } else {
      if (Hls.isSupported()) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(props.videoUrl);
        hls.attachMedia(video);
      } else {
        video.src = props.videoUrl;
        console.log('Hls.js is not supported');
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [props.videoUrl]);

  return (
    <div>
      <div className="m-6 mx-auto flex w-10/12 justify-center rounded-md border-4 border-green-700 md:w-6/12">
        <video
          ref={videoRef}
          controls
          poster="https://i.ytimg.com/vi/AUR179cxRzk/maxresdefault.jpg"
          style={{ width: '100%' }}
        ></video>
      </div>
    </div>
  );
}

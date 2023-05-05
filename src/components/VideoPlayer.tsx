'use client';

import React, { useEffect } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
  useEffect(() => {
    if (Hls.isSupported()) {
      const video: any = document.getElementById('video-player');
      const hls = new Hls();
      hls.loadSource(
        'https://1333578254.rsc.cdn77.org/1537084837/tracks-v2a1/mono.m3u8'
      );
      hls.attachMedia(video);
    }
  }, []);

  return (
    <div>
      <video id="video-player" controls></video>
    </div>
  );
}

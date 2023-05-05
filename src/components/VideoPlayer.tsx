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
    <div className=" m-6 mx-auto w-6/12 rounded-sm border-2 border-red-500">
      <video id="video-player" controls></video>
    </div>
  );
}

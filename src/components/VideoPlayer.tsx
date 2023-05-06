'use client';

import React, { useEffect } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const video: any = document.getElementById('video-player');
    if (isIos) {
      video.src =
        'https://1333578254.rsc.cdn77.org/1537084837/tracks-v2a1/mono.m3u8';
    } else {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(
          'https://1333578254.rsc.cdn77.org/1537084837/tracks-v2a1/mono.m3u8'
        );
        hls.attachMedia(video);
      } else {
        console.log('Hls.js is not supported');
      }
    }
  }, []);

  return (
    <div>
      <h1 className="  text-center text-3xl font-bold">Live Stream</h1>
      <div className=" m-6 mx-auto flex w-6/12 justify-center rounded-sm border-2 border-red-500">
        <video id="video-player" controls></video>
      </div>
    </div>
  );
}

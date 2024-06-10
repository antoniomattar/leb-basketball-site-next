'use client';

import React, { useEffect } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer(props: any) {
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const video: any = document.getElementById('video-player');
    if (isIos) {
      video.src = props.videoUrl;
    } else {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(props.videoUrl);
        hls.attachMedia(video);
      } else {
        console.log('Hls.js is not supported');
      }
    }
  }, []);

  return (
    <div>
      <div className=" m-6 mx-auto flex w-10/12 justify-center rounded-md border-4 border-green-700 md:w-6/12">
        <video
          id="video-player"
          controls
          poster="https://i.ytimg.com/vi/AUR179cxRzk/maxresdefault.jpg"
        ></video>
      </div>
    </div>
  );
}

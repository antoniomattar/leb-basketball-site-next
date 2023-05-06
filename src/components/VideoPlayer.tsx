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
      <h1 className=" text-center font-mono text-3xl font-bold">Live Stream</h1>
      <div className=" m-6 mx-auto flex w-10/12 justify-center rounded-md border-4 border-green-700 md:w-6/12">
        <video
          id="video-player"
          controls
          poster="https://scontent.cdninstagram.com/v/t51.2885-15/344583261_1616376318879400_3493646322755263099_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=H6w7-mOVGsEAX_Q2kWg&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCqhdNJvdCAoVRs02QObFIRGfaGCjGEBFMqSAtolEH12g&oe=645B0239&_nc_sid=978cb9&dl=1"
        ></video>
      </div>
    </div>
  );
}

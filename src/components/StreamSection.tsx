'use client';

import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';


const STREAMS = [
  {
    label: 'Stream Arabic',
    url: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8',
  },
  {
    label: 'Stream English',
    url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  },
];

export default function StreamSection() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Stream Selector */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-2xl bg-gray-900 p-2 shadow-lg">
          {STREAMS.map((stream, idx) => (
            <button
              key={stream.label}
              className={`
                rounded-xl px-6 py-2 text-sm font-semibold text-gray-400 transition-all
                duration-300 hover:bg-gray-700 hover:text-white
                ${
                  selected === idx ? 'bg-blue-600 text-white shadow-md' : '' // This empty string is the key change
                }
              `}
              onClick={() => setSelected(idx)}
            >
              {stream.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video Player */}
      <div className="overflow-hidden rounded-2xl bg-black shadow-xl">
        <VideoPlayer videoUrl={STREAMS[selected].url} />
      </div>
    </div>
  );
}
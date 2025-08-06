'use client';

import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

interface Stream {
  label: string;
  url: string;
  type: 'iframe' | 'hls';
}

const STREAMS: Stream[] = [
  {
    label: 'Stream Arabic',
    url: 'https://ok.ru/video/10614336265842',
    type: 'iframe',
  },
  {
    label: 'Stream English',
    url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    type: 'hls',
  },
];

export default function StreamSection() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Stream Selector */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          {STREAMS.map((stream, idx) => (
            <button
              key={stream.label}
              className={`
                rounded-md px-6 py-2 text-sm font-medium transition-all duration-200
                ${
                  selected === idx
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-white hover:text-gray-900'
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
      <div className="overflow-hidden rounded-lg bg-black shadow-lg">
        <VideoPlayer
          videoUrl={STREAMS[selected].url}
          mediaType={STREAMS[selected].type}
        />
      </div>
    </div>
  );
}

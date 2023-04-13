'use client';

import React from 'react';
import { useState } from 'react';

function News() {
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    fetch('http://247basketball.live/json_timelineNew.php')
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        console.log(data);
      });
  };

  return (
    <div>
      <h1>News</h1>
      <button onClick={fetchNews}>Fetch News</button>
      <ul>
        {news.map((item) => (
          <li key={item}>
            <h2>{item}</h2>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;

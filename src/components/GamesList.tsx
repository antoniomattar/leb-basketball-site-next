'use client';

import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';

export default function GamesList() {
  const [games, setGames] = useState<{ [key: string]: any[] }>({});
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/games');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        // Filter games to only show those after August 1st, 2025
        const cutoffDate = new Date('2025-08-01');
        const filteredGames = (data.response || []).filter((game: any) => {
          if (!game.date) return false;
          const gameDate = new Date(game.date);
          return gameDate > cutoffDate;
        });

        // Sort games by date (earliest first)
        const sortedGames = filteredGames.sort((a: any, b: any) => {
          const dateA = new Date(a.date || '');
          const dateB = new Date(b.date || '');
          return dateA.getTime() - dateB.getTime();
        });

        // Group games by day
        const gamesByDay = sortedGames.reduce((acc: any, game: any) => {
          const gameDate = game.date?.slice(0, 10); // Get YYYY-MM-DD format
          if (!acc[gameDate]) {
            acc[gameDate] = [];
          }
          acc[gameDate].push(game);
          return acc;
        }, {});

        // Get sorted list of available days
        const days = Object.keys(gamesByDay).sort();
        setAvailableDays(days);
        setGames(gamesByDay);

        // Only set current day index after hydration to avoid SSR mismatch
        if (isHydrated) {
          const today = new Date().toISOString().slice(0, 10);
          const todayIndex = days.indexOf(today);
          setCurrentDayIndex(todayIndex >= 0 ? todayIndex : 0);
        } else {
          // Default to first day during SSR
          setCurrentDayIndex(0);
        }
      } catch (e) {
        setError('Failed to fetch games list.');
        setGames({});
        setAvailableDays([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, [isHydrated]);

  const handlePreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < availableDays.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const currentDay = availableDays[currentDayIndex];
  const currentDayGames = currentDay ? games[currentDay] || [] : [];

  if (loading) {
    return (
      <div className="text-center font-mono text-green-700">
        Loading games...
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }
  if (!currentDay || currentDayGames.length === 0) {
    return <div className="text-center">No games found.</div>;
  }

  return (
    <div id="games">
      <h1 className="m-6 flex justify-center font-mono text-6xl font-bold">
        GAMES
      </h1>

      {/* Day Navigation using Round component design */}
      <div className="mx-auto mb-8 flex items-center justify-center self-center">
        <button
          className="rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentDayIndex === 0}
          onClick={handlePreviousDay}
        >
          Back
        </button>
        <div className="m-6 max-h-fit justify-center rounded-3xl bg-green-600 p-6 font-semibold shadow-lg outline outline-black">
          {new Date(currentDay).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <button
          className="rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentDayIndex === availableDays.length - 1}
          onClick={handleNextDay}
        >
          Next
        </button>
      </div>

      <center>
        <div className="space-y-4 font-mono">
          {currentDayGames.map((game: any) => (
            <GameCard
              key={game.id}
              team_a={game.teams.home.name}
              team_b={game.teams.away.name}
              team_a_logo={game.teams.home.logo}
              team_b_logo={game.teams.away.logo}
              team_a_result={game.scores.home?.total ?? 0}
              team_b_result={game.scores.away?.total ?? 0}
              match_date={game.date?.slice(0, 10)}
              match_time={game.time}
              venue={game.venue}
              status={game.status?.long}
            />
          ))}
        </div>
      </center>
    </div>
  );
}

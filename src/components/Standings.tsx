'use client';

import React, { useEffect, useState } from 'react';

interface Team {
  name: string;
  flag: string;
  W?: number;
  L?: number;
  Pts?: number;
  PF?: number; // Points For
  PA?: number; // Points Against
  PD?: number; // Point Difference
}

interface TeamStats {
  name: string;
  flag: string;
  W: number;
  L: number;
  Pts: number;
  PF: number;
  PA: number;
  PD: number;
}

const GROUPS = [
  {
    name: 'Group A',
    teams: [
      { name: 'Qatar', flag: '🇶🇦' },
      { name: 'Australia', flag: '🇦🇺' },
      { name: 'Korea', flag: '🇰🇷' },
      { name: 'Lebanon', flag: '🇱🇧' },
    ] as Team[],
  },
  {
    name: 'Group B',
    teams: [
      { name: 'Guam', flag: '🇬🇺' },
      { name: 'Japan', flag: '🇯🇵' },
      { name: 'Syria', flag: '🇸🇾' },
      { name: 'Iran', flag: '🇮🇷' },
    ] as Team[],
  },
  {
    name: 'Group C',
    teams: [
      { name: 'China', flag: '🇨🇳' },
      { name: 'Jordan', flag: '🇯🇴' },
      { name: 'India', flag: '🇮🇳' },
      { name: 'Saudi Arabia', flag: '🇸🇦' },
    ] as Team[],
  },
  {
    name: 'Group D',
    teams: [
      { name: 'Chinese Taipei', flag: '🇹🇼' },
      { name: 'New Zealand', flag: '🇳🇿' },
      { name: 'Iraq', flag: '🇮🇶' },
      { name: 'Philippines', flag: '🇵🇭' },
    ] as Team[],
  },
];

const TEAM_GROUP_MAP = Object.fromEntries(
  GROUPS.flatMap((g) => g.teams.map((t) => [t.name, g.name]))
);

export default function Standings() {
  const [standings, setStandings] = useState<Record<
    string,
    Record<string, TeamStats>
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/standings');
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `API error: ${res.status}`);
        }
        const data = await res.json();

        // Check if we received an error response
        if (data.error) {
          throw new Error(data.message || data.error);
        }

        // Initialize standings structure
        const groupStandings: Record<string, Record<string, TeamStats>> = {};

        // Initialize all teams with zero stats
        for (const group of GROUPS) {
          groupStandings[group.name] = {};
          for (const team of group.teams) {
            groupStandings[group.name][team.name] = {
              ...team,
              W: 0,
              L: 0,
              Pts: 0,
              PF: 0,
              PA: 0,
              PD: 0,
            };
          }
        }

        // Calculate standings from games results
        const games = data.response || [];
        console.log(
          `📊 Processing ${games.length} games for standings calculation`
        );

        // Filter games to only include those after August 1st, 2025
        const cutoffDate = new Date('2025-08-01');
        let processedGames = 0;

        for (const game of games) {
          const home = game.teams?.home?.name;
          const away = game.teams?.away?.name;
          const homeScore = game.scores?.home?.total;
          const awayScore = game.scores?.away?.total;
          const gameDate = game.date ? new Date(game.date) : null;

          // Only count finished games with valid scores and dates after cutoff
          if (
            home &&
            away &&
            home in TEAM_GROUP_MAP &&
            away in TEAM_GROUP_MAP &&
            typeof homeScore === 'number' &&
            typeof awayScore === 'number' &&
            homeScore !== null &&
            awayScore !== null &&
            gameDate &&
            gameDate > cutoffDate
          ) {
            processedGames++;
            const homeGroup = TEAM_GROUP_MAP[home];
            const awayGroup = TEAM_GROUP_MAP[away];

            // Update stats for home team
            groupStandings[homeGroup][home].PF += homeScore;
            groupStandings[homeGroup][home].PA += awayScore;
            groupStandings[homeGroup][home].PD =
              groupStandings[homeGroup][home].PF -
              groupStandings[homeGroup][home].PA;

            // Update stats for away team
            groupStandings[awayGroup][away].PF += awayScore;
            groupStandings[awayGroup][away].PA += homeScore;
            groupStandings[awayGroup][away].PD =
              groupStandings[awayGroup][away].PF -
              groupStandings[awayGroup][away].PA;

            // Determine winner and update W/L/Pts
            if (homeScore > awayScore) {
              // Home team wins
              groupStandings[homeGroup][home].W++;
              groupStandings[homeGroup][home].Pts += 2;
              groupStandings[awayGroup][away].L++;
              groupStandings[awayGroup][away].Pts += 1;
            } else if (awayScore > homeScore) {
              // Away team wins
              groupStandings[awayGroup][away].W++;
              groupStandings[awayGroup][away].Pts += 2;
              groupStandings[homeGroup][home].L++;
              groupStandings[homeGroup][home].Pts += 1;
            }
          }
        }

        console.log(
          `✅ Standings calculated successfully from ${processedGames} games (after Aug 1, 2025)`
        );
        setStandings(groupStandings);
        setError(null); // Clear any previous errors
      } catch (e) {
        console.error('Failed to load standings:', e);
        const errorMessage =
          e instanceof Error ? e.message : 'Unknown error occurred';
        setError(`Failed to load standings: ${errorMessage}`);
        setStandings(null);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return (
    <div id="standings" className="my-8">
      <h1 className="m-6 text-center font-mono text-4xl font-bold">
        Asia Cup 2025 Standings
      </h1>
      {loading ? (
        <div className="text-center font-mono text-green-700">Loading...</div>
      ) : null}
      {error ? (
        <div className="mb-4 text-center font-mono text-red-600">{error}</div>
      ) : null}
      <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 xl:grid-cols-4">
        {(standings
          ? GROUPS.map((group) => ({
              ...group,
              teams: Object.values(standings[group.name]).sort(
                (a: TeamStats, b: TeamStats) => {
                  // Sort by Points (descending), then by Point Difference (descending), then by Points For (descending)
                  if (b.Pts !== a.Pts) return b.Pts - a.Pts;
                  if (b.PD !== a.PD) return b.PD - a.PD;
                  return b.PF - a.PF;
                }
              ),
            }))
          : GROUPS
        ).map((group) => (
          <div
            key={group.name}
            className="rounded-2xl border border-green-700 bg-white p-4 shadow-lg"
          >
            <h2 className="mb-4 text-center text-2xl font-bold text-green-700">
              {group.name}
            </h2>
            <table className="w-full table-auto text-center font-mono text-sm">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="px-1 py-2">Team</th>
                  <th className="px-1 py-2">W</th>
                  <th className="px-1 py-2">L</th>
                  <th className="px-1 py-2">Pts</th>
                  <th className="px-1 py-2">+/-</th>
                </tr>
              </thead>
              <tbody>
                {group.teams.map((team: TeamStats | Team, index: number) => (
                  <tr
                    key={team.name}
                    className={`border-b last:border-0 hover:bg-green-50 ${
                      index === 0 ? 'bg-green-100 font-semibold' : ''
                    }`}
                  >
                    <td className="flex items-center justify-start gap-1 px-1 py-2 font-semibold">
                      <span className="text-lg">{team.flag}</span>
                      <span className="truncate text-xs">{team.name}</span>
                    </td>
                    <td className="px-1 py-2">{team.W ?? 0}</td>
                    <td className="px-1 py-2">{team.L ?? 0}</td>
                    <td className="px-1 py-2 font-bold">{team.Pts ?? 0}</td>
                    <td
                      className={`px-1 py-2 ${
                        (team.PD ?? 0) > 0
                          ? 'text-green-600'
                          : (team.PD ?? 0) < 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {(team.PD ?? 0) > 0 ? '+' : ''}
                      {team.PD ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

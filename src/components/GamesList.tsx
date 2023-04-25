/* eslint-disable react/jsx-key */
import GameCard from './GameCard';

export default async function GamesList(props: any) {
  const gamesUrl = props.url;
  const gamesListRequest = await fetch(gamesUrl, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  }).then((response) => response.json());

  return (
    <div id="games">
      <center>
        <div className="font-mono">
          {gamesListRequest['posts'].map((game: any) => (
            <GameCard {...game['post']} />
          ))}
        </div>
      </center>
    </div>
  );
}

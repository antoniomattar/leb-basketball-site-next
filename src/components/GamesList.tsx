/* eslint-disable react/jsx-key */
import GameCard from './GameCard';


export default async function GamesList(props: any) {
  const gamesUrl = `http://247basketball.live/json_r_matchs.php?c_id=44&r_id=${props.roundId}`;
  const gamesListRequest = await fetch(gamesUrl, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  }).then((response) => response.json());

  return (
    <div>
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
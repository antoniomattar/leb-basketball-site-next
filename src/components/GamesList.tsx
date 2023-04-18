/* eslint-disable react/jsx-key */
import GameCard from './GameCard';

export default async function GamesList() {
  const gamesListRequest = await fetch(
    'http://247basketball.live/json_r_matchs.php'
  ).then((response) => response.json());
  // console.log(newsListRequest['posts'][0]['post']);

  return (
    <>
      <center>
        <h1 className="m-6 font-mono text-6xl font-bold ">GAMES</h1>
        <div className="font-mono">
          {gamesListRequest['posts'].map((game: any) => (
            <GameCard {...game['post']} />
          ))}
        </div>
      </center>
    </>
  );
}

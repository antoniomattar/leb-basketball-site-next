/* eslint-disable react/jsx-key */
import GameCard from './GameCard';

const GamesList = async () => {
  const gamesListRequest = await fetch(
    'http://247basketball.live/json_r_matchs.php'
  ).then((response) => response.json());
  // console.log(newsListRequest['posts'][0]['post']);

  return (
    <>
      <center>
        <h1 className="text-4xl font-bold ">GAMES</h1>
        <div>
          {gamesListRequest['posts'].map((game: any) => (
            <GameCard {...game['post']} />
          ))}
        </div>
      </center>
    </>
  );
};

export default GamesList;

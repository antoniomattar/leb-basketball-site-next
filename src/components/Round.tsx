import GamesList from './GamesList';

export default async function Round() {
  const allRoundsRequest = await fetch(
    'http://247basketball.live/json_rounds_all.php'
  ).then((response) => response.json());
  const allRounds = allRoundsRequest['posts'];
  const roundIdsAndNames = [];
  for (let i = 0; i < allRounds.length; i++) {
    roundIdsAndNames.push({
      id: allRounds[i]['post'].id,
      name: allRounds[i]['post'].r_id,
    });
  }

  const currentRound = roundIdsAndNames[roundIdsAndNames.length - 1];
  const currentRoundGamesRequestUrl = `http://247basketball.live/json_r_matchs.php?r_id=${currentRound['id']}`;

  return (
    <>
      <h1 className="m-6 flex justify-center font-mono text-6xl font-bold ">
        GAMES
      </h1>
      <div className=" mx-auto max-h-fit max-w-fit justify-center rounded-3xl bg-lime-400 p-8 font-semibold shadow-lg outline-dashed outline-black dark:bg-slate-800">
        {currentRound['name']}
      </div>
      {/* @ts-expect-error Server Component */}
      <GamesList url={currentRoundGamesRequestUrl} />
    </>
  );
}

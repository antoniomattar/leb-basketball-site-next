import GamesList from './GamesList';

export default async function Round() {
  const allRoundsRequest = await fetch(
    'http://247basketball.live/json_rounds_all.php',
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
      },
    }
  ).then((response) => response.json());
  const allRounds = allRoundsRequest['posts'];
  const roundIdsAndNames: any = [];
  for (let i = 0; i < allRounds.length; i++) {
    roundIdsAndNames.push({
      id: allRounds[i]['post'].id,
      name: allRounds[i]['post'].r_id,
    });
  }

  const currentRound = roundIdsAndNames[roundIdsAndNames.length - 1];
  const currentRoundGamesRequestUrl = `http://247basketball.live/json_r_matchs.php?r_id=${currentRound['id']}`;

  return (
    <div id="games">
      <h1 className="m-6 flex justify-center font-mono text-6xl font-bold ">
        GAMES
      </h1>

      <div className="mx-auto flex items-center justify-center self-center">
        <button
          className="rounded bg-lime-700 px-4 py-2 font-bold text-white hover:bg-lime-900"
          disabled={currentRound['id'] === 0}
        >
          Back
        </button>
        <div className=" m-6 max-h-fit  justify-center rounded-3xl bg-lime-400 p-6 font-semibold shadow-lg outline outline-black">
          {currentRound['name']}
        </div>
        <button
          className="rounded bg-lime-700 px-4 py-2 font-bold text-white hover:bg-lime-900"
          disabled={currentRound['id'] === roundIdsAndNames - 1}
        >
          Next
        </button>
      </div>
      {/* @ts-expect-error Server Component */}
      <GamesList url={currentRoundGamesRequestUrl} />
    </div>
  );
}

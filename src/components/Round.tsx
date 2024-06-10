import GamesList from './GamesList';

export default async function Round() {
  const allRoundsRequest = await fetch(
    'http://247basketball.live/json_rounds_all.php?c_id=44',
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

  var currentRoundIndex = roundIdsAndNames.length - 3;
  var currentRound = roundIdsAndNames[currentRoundIndex];

  return (
    <div id="games">
      <h1 className="m-6 flex justify-center font-mono text-6xl font-bold ">
        GAMES
      </h1>

      <div className="mx-auto flex items-center justify-center self-center">
        <button
          className="rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-900"
          disabled={currentRound['id'] === 0}
        >
          Back
        </button>
        <div className=" m-6 max-h-fit  justify-center rounded-3xl bg-green-600 p-6 font-semibold shadow-lg outline outline-black">
          {currentRound['name']}
        </div>
        <button
          className="rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-900"
          disabled={currentRound['id'] === roundIdsAndNames - 1}
        >
          Next
        </button>
      </div>
      {/* @ts-expect-error Server Component */}
      <GamesList roundId={currentRound['id']} />
    </div>
  );
}

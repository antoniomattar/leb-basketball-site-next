/* eslint-disable react/jsx-key */
export default async function Standings() {
  const standingsRequest = await fetch(
    'http://247basketball.live/json_standing_new_app.php?c_id=42'
  ).then((response) => response.json());
  const standingsGroups = [
    standingsRequest['Standing1'],
    standingsRequest['Standing2'],
  ];

  return (
    <>
      <h1 className="m-6 text-center font-mono text-4xl font-bold">
        FINAL 8 STANDINGS
      </h1>
      <div className="font-mono">
        {standingsGroups.map((group) => (
          <div>
            <table className="m-6 mx-auto w-auto max-w-full table-auto overflow-hidden bg-green-600 px-4 py-4 shadow-lg sm:rounded-3xl sm:px-6 ">
              <caption className=" mb-6 mt-6 caption-top text-2xl font-bold">
                {group[0]['post'].name}
              </caption>
              <thead className=" bg-yellow-400 sm:rounded-3xl">
                <tr>
                  <th scope="col">Team</th>
                  <th scope="col">W</th>
                  <th scope="col">L</th>
                  <th scope="col">Pts</th>
                  <th scope="col">OFF RTG</th>
                  <th scope="col">DEF RTG</th>
                </tr>
              </thead>
              <tbody>
                {group.map((team: any) => (
                  <tr
                    key={team['post'].position}
                    className="border-b border-gray-200"
                  >
                    <td className="w-1/4 px-4 py-2">{team['post'].team}</td>
                    <td className="px-4 py-2 text-center">
                      {team['post'].win}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {team['post'].loss}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {team['post'].points}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {(
                        parseFloat(team['post'].PF) /
                        parseFloat(team['post'].played)
                      ).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {(
                        parseFloat(team['post'].PG) /
                        parseFloat(team['post'].played)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}

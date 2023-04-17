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
      <div>
        {standingsGroups.map((group) => (
          <div>
            <h2 className="text-center text-5xl font-bold">
              {group[0]['post'].name}
            </h2>
            <table className="table-striped table">
              <thead>
                <tr>
                  <th scope="col" width="20%">
                    Team
                  </th>
                  <th scope="col">W</th>
                  <th scope="col">L</th>
                  <th scope="col">Pts</th>
                  <th scope="col">OFF RTG</th>
                  <th scope="col">DEF RTG</th>
                </tr>
              </thead>
              <tbody>
                {group.map((team: any) => (
                  <tr key={team['post'].position}>
                    <td>{team['post'].team}</td>
                    <td>{team['post'].win}</td>
                    <td>{team['post'].loss}</td>
                    <td>{team['post'].points}</td>
                    <td>
                      {(
                        parseFloat(team['post'].PF) /
                        parseFloat(team['post'].played)
                      ).toFixed(2)}
                    </td>
                    <td>
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

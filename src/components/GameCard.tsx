/* eslint-disable @next/next/no-img-element */
function GameCard(props: any) {
  const BASE_URL = 'http://leb.basketball.247.s3.amazonaws.com';
  const team_a_image_url = `${BASE_URL}/logo/${props.team_a}_p.png`;
  const team_b_image_url = `${BASE_URL}/logo/${props.team_b}_p.png`;
  return (
    <>
      <div className="col-auto flex items-center">
        <div className="w-1/12 items-center">
          <a>
            <img src={team_a_image_url} alt={props.team_a} className="w-full" />
          </a>
        </div>
        <div className="w-1/12 items-center">
          <a>
            <img
              src="https://www.freepnglogos.com/uploads/vs-png/black-vs-logo-image-download-png-20.png"
              alt={props.team_a}
              className="h-8 w-8"
            />
          </a>
        </div>
        <div className="w-1/12 items-center">
          <a>
            <img src={team_b_image_url} alt={props.team_b} className="w-full" />
          </a>
        </div>
      </div>
      <div className="ml-4">
        {props.r_id}
        <br />
        {props.team_a} vs {props.team_b}
      </div>

      <div className="text-normal">
        <div>
          🕰️: {props.match_date} at {props.match_time}
        </div>
        <div>🏟️: {props.venue}</div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default GameCard;

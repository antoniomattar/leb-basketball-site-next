/* eslint-disable @next/next/no-img-element */
function GameCard(props: any) {
  const BASE_URL = 'http://leb.basketball.247.s3.amazonaws.com';
  const team_a_image_url = `${BASE_URL}/logo/${props.team_a}_p.png`;
  const team_b_image_url = `${BASE_URL}/logo/${props.team_b}_p.png`;
  return (
    <div className="row-auto m-6 mx-auto grid max-w-sm items-center rounded-3xl bg-green-600 p-8 shadow-lg md:p-5 ">
      <div className=" col-auto flex items-center justify-center">
        <div className="w-1/6">
          <a>
            <img src={team_a_image_url} alt={props.team_a} className="w-full" />
          </a>
        </div>
        <div className=" w-1/6 p-4">
          <a>
            <img
              src="https://www.freepnglogos.com/uploads/vs-png/black-vs-logo-image-download-png-20.png"
              alt={props.team_a}
              className="h-8 w-8"
            />
          </a>
        </div>
        <div className="w-1/6">
          <a>
            <img src={team_b_image_url} alt={props.team_b} className="w-full" />
          </a>
        </div>
      </div>
      <div className="ml-4">
        {props.team_a} vs {props.team_b}
      </div>

      {props.team_a_result != 0 && props.team_b_result != 0 ? (
        <div className=" text-4xl font-bold">
          {props.team_a_result} - {props.team_b_result}
        </div>
      ) : (
        <div></div>
      )}
      <div className="mx-auto text-left">
        <div>
          🕰️: {props.match_date} at {props.match_time}
        </div>
        <div>🏟️: {props.venue}</div>
      </div>
    </div>
  );
}

export default GameCard;

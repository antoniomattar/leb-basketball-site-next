function GameCard(props: any) {
  const team_a_image = `http://leb.basketball.247.s3.amazonaws.com/logo/${props.team_a}_p.png`;
  const team_b_image = `http://leb.basketball.247.s3.amazonaws.com/logo/${props.team_b}_p.png`;
  return (
    <>
      <div className="row justify-center">
        <div className="col-lg-1 col-md-1 col-xs-1">
          <a className="thumbnail">
            <img src={team_a_image} alt={props.team_a} />
          </a>
        </div>
        <div className="col-lg-1 col-md-1 col-xs-1">
          <a className="thumbnail">
            <img
              src="https://www.freepnglogos.com/uploads/vs-png/black-vs-logo-image-download-png-20.png"
              alt={props.team_a}
              width={80}
              height={80}
            />
          </a>
        </div>
        <div className="col-lg-1 col-md-1 col-xs-1">
          <a className="thumbnail">
            <img src={team_b_image} alt={props.team_b} />
          </a>
        </div>

        <div>
          {props.r_id}
          <br />
          {props.team_a} vs {props.team_b}
        </div>
      </div>

      <div>
        {props.match_date} at {props.match_time}
      </div>
      <div>STADIUM: {props.venue}</div>
      <br />
      <br />
      <br />
    </>
  );
}

export default GameCard;

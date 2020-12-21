import React from "react";
import Helmet from "react-helmet";
import Tetris from "react-tetris";
import "../css/NotFound.css";
import $ from 'jquery';

// const [count, setCount] = useState(0);
//
// useEffect(() => {
//   setCount(count+1);
//   console.log({count});
// });

function fade() {
  $('.remark').show();
  setTimeout(function() {
    $('.remark').fadeOut(300);
  }, 1000);
}

function NotFound() {
  const loadcount = (JSON.parse(localStorage.getItem('404count')) || 0) + 1;
  localStorage.setItem('404count', loadcount);

  const remarks = () => {
    // let angle = Math.random()*Math.PI*2;
    // let ypos = Math.sin(angle)*10;
    // let xpos = Math.cos(angle)*10;
    var phrases = ["Stop playing tetris...", "Don't you have things to do", "Well this is excessive", "just use jstris gdi", "im running outta ideas", "my sanity is suffering", "are u srsly playing this"];
    var phrase = phrases[Math.floor(Math.random() * phrases.length)];
    let ypos = Math.floor(Math.random()*106+15);
    let xpos = -30 + Math.round(Math.random())*160
    return (
      <><div
        className = "remark"
        style={{position:"fixed", width:"fit-content", top:`${ypos}%`, left:`${xpos}%`, transform:"translate(-50%,-50%)"}}
      >
        {phrase}
      </div>
      {fade()}</>
    )
  }

  return (
    <>
      <Helmet>
        <title>BuzzBook | 404</title>
      </Helmet>
      <div className="w-25 position-relative" style={{margin: "0 auto", top: "45%", transform: "translate(0,-50%)"}}>
        <div className="navfont">
          {loadcount <= 3 ? (
            <><b>404 Something broke!</b> <br/>Page not found... Or something&#39;s wrong... <br/>We don&#39;t exactly know why you&#39;re here but here&#39;s a tetris game to distract you while we figure out where our site went. If you believe there should be something here, please fill out a <span style={{color:"var(--blue)"}}>bug report</span> to let us know</>
          ) : loadcount <= 7 ? (
            <><b>404 Something broke!</b> <br/>Well, fancy seeing you here again. You&#39;ve been here {loadcount} times now... that might be on yourself mate</>
          ) : loadcount <= 10 ? (
            <><b>404 Something broke!</b> <br/>I find your lack of navigation quite distressing considering you go to an institute of <i>technology</i>... Here&#39;s the tetris game to drown out your tears</>
          ) : (
            <><b>Why are you here... click the damn links</b> <br/>{loadcount} visits now... It&#39;s the tetris game isn&#39;t it... alright whatever, have at it.</>
          )}
        </div>
        {/*<img alt="nvm its really not working "src="https://loremflickr.com/320/240/bee" />*/}
        <div className="inline mt-3" style={{justifyContent:"center"}}>
          <Tetris>
            {({ HeldPiece, Gameboard, PieceQueue, points, linesCleared }) => (
              <div>
                <div style={{position: "relative"}}>
                  <p className="contentfont d-inline-block w-50 mb-1">POINTS: {points}</p>
                  <p className="contentfont d-inline-block w-50 text-right mb-1">CLEARED: {linesCleared}</p>
                </div>
                <div className="d-inline-block align-top"><HeldPiece/></div>
                <div className="d-inline-block align-top px-3"><Gameboard/></div>
                <div className="d-inline-block align-top"><PieceQueue/></div>
                {linesCleared >= 5 && remarks()}
              </div>
            )}
          </Tetris>
        </div>
      </div>
    </>
  );
}

export default NotFound;

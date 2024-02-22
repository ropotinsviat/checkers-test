import { useState, useEffect } from "react";

function PlayerTable({ white, black, inGame, turn, selectColor, makeMove }) {
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [whiteInterval, setWhiteInterval] = useState(null);
  const [blackInterval, setBlackInterval] = useState(null);

  useEffect(() => {
    setWhiteTime(white?.time);
    setBlackTime(black?.time);
    clearInterval(whiteInterval);
    clearInterval(blackInterval);

    if (inGame) {
      if (turn) {
        setWhiteInterval(
          setInterval(() => {
            setWhiteTime((prevTime) => prevTime + 1);
            if (whiteTime > 599) makeMove();
          }, 1000)
        );
      } else {
        setBlackInterval(
          setInterval(() => {
            setBlackTime((prevTime) => prevTime + 1);
            if (blackTime > 599) makeMove();
          }, 1000)
        );
      }
    }
  }, [inGame, turn]);

  function formattedTime(time) {
    if (typeof time !== "number") return;
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}/10:00`;
  }

  return (
    <div>
      <div
        onClick={() => selectColor({ color: "white" })}
        className={`player-table ${inGame && turn && "turn"} ${
          !inGame && "selecteble"
        }`}
      >
        <div className="circle-wrapper">
          <div className="wc"></div>
        </div>
        <div className="player-nametime-wrapper">
          <div>{white?.name}</div>
          {inGame ? (
            <div>{formattedTime(whiteTime)}</div>
          ) : (
            white && (white.ready ? "Ready" : "Not ready")
          )}
        </div>
      </div>
      <div
        onClick={() => selectColor({ color: "black" })}
        className={`player-table ${inGame && !turn && "turn"} ${
          !inGame && "selecteble"
        }`}
      >
        <div className="circle-wrapper">
          <div className="bc"></div>
        </div>
        <div className="player-nametime-wrapper">
          <div>{black?.name}</div>
          {inGame ? (
            <div>{formattedTime(blackTime)}</div>
          ) : (
            black && (black.ready ? "Ready" : "Not ready")
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerTable;

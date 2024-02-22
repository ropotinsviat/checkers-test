import { useState, useEffect } from "react";
import "../styles/game.css";
import PlayerTable from "../components/playerTable";
import Board from "../components/board";

function Game({ name, socket, navigate, connectionCheck }) {
  const [white, setWhite] = useState(null);
  const [black, setBlack] = useState(null);
  const [board, setBoard] = useState([[]]);
  const [turn, setTurn] = useState(true);
  const [movesInfo, setMovesInfo] = useState({ moves: [] });
  const [inGame, setInGame] = useState(false);

  function setInfo(room) {
    if (room.white?.name === name || room.black?.name === name)
      setMovesInfo(room.movesInfo);
    setWhite(room.white);
    setBlack(room.black);
    if (room.board?.length > 0) setBoard(room.board);
    setTurn(room.turn);
    setInGame(room.inGame);
  }

  useEffect(() => {
    socket.on("endGame", (data) => {
      setInfo(data.room);
      setMovesInfo({ attack: false, moves: [] });
      alert(data.message);
    });
    socket.on("updateData", (data) => setInfo(data));

    return () => {
      socket.off("endGame");
      socket.off("updateData");
    };
  }, []);

  const makeMove = connectionCheck((i1, j1, i2, j2) =>
    socket.emit("makeMove", {
      move: { from: [i1, j1], to: [i2, j2] },
    })
  );

  const selectColor = (data) => socket.emit("selectColor", data);
  const setReady = () => socket.emit("setReady", { ready: true });
  const surrender = () => socket.emit("surrender");

  function leave() {
    socket.emit("leave");
    navigate("/home");
  }

  return (
    <div className="felix">
      <Board
        board={board}
        setBoard={setBoard}
        turn={turn}
        movesInfo={movesInfo}
        makeMove={makeMove}
        isWhite={black?.name === name ? false : true}
      />
      <div className="side-panel">
        <PlayerTable
          white={white}
          black={black}
          selectColor={selectColor}
          inGame={inGame}
          turn={turn}
          makeMove={makeMove}
        />
        <div className="button-bar">
          {!inGame && (white?.name === name || black?.name === name) && (
            <input type="button" value="Ready" onClick={setReady} />
          )}
          {inGame && (white?.name === name || black?.name === name) && (
            <input type="button" value="Surrender" onClick={surrender} />
          )}
          <input type="button" value="Leave" onClick={leave} />
        </div>
      </div>
    </div>
  );
}

export default Game;

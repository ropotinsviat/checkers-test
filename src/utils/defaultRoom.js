export default function defaultRoom() {
  return {
    white: { name: "", time: 0, ready: false },
    black: { name: "", time: 0, ready: false },
    board: [[]],
    turn: true,
    moves: { attack: false, moves: [] },
    inGame: false,
  };
}

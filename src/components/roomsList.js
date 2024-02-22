import "../styles/roomsList.css";

function RoomsList({ rooms, joinRoom }) {
  return (
    <div className="rooms-container">
      <div className="rooms-list">
        {rooms.map((room, key) => (
          <div
            className="room-item"
            key={key}
            onClick={() => joinRoom(room.roomId)}
          >
            <div className="room-name"># {room.roomId}</div>
            <div>{room.inGame && "in game"}</div>
            <div className="room-users">
              <div>p1: {room.white || "'empty'"}</div>
              <div>p2: {room.black || "'empty'"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomsList;

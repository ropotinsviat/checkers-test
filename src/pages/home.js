import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import RoomsList from "../components/roomsList.js";
import CupIcon from "../components/cup.js";
import "../styles/home.css";

function Home({ name, socket, connectionCheck, store, navigate }) {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    socket.emit("getRooms", async (callback) => {
      setRooms(callback);
      setFilteredRooms(callback);
      console.log("rooms");
    });
  }, []);

  const joinRandomRoom = connectionCheck(() => {
    socket.emit("joinRandomRoom");
    navigate("/queue");
  });

  const handleInputChange = (event) => {
    setSearchCriteria(event.target.value);
    const filtered = rooms.filter((room) =>
      room.roomId.startsWith(event.target.value)
    );
    setFilteredRooms(filtered);
  };

  const joinRoom = (roomId) => socket.emit("joinRoom", { roomId });
  return (
    <div>
      <div className="top-bar">
        <div className="ratings">
          <CupIcon func={() => navigate("/ratings")} />
        </div>
        <div>
          <h2>{`Welcome, ${name}`}</h2>
        </div>
        <div className="logout-wrapper ">
          <input
            className="top-butttons"
            type="button"
            value="Log out"
            onClick={() => store.logout()}
          />
        </div>
      </div>
      <div className="menu-wrapper">
        <div className="menu-block">
          <div className="rooms-search-box">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search"
                value={searchCriteria}
                onChange={handleInputChange}
              />
            </div>
            <RoomsList rooms={filteredRooms} joinRoom={joinRoom} />
          </div>
        </div>
      </div>
    </div>
  );
}
//  <input type="button" value="Play online!" onClick={joinRandomRoom} />
//  <RoomsList rooms={rooms} joinRoom={joinRoom} />
export default observer(Home);

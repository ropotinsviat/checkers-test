import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import socket from "./socket.js";
import Home from "./pages/home";
import Game from "./pages/game";
import Auth from "./pages/auth";
import Store from "./store/store";
import Ratings from "./pages/ratings.js";

const store = new Store();

const App = () => {
  const navigate = useNavigate();

  const [me, setMe] = useState("");

  useEffect(() => {
    navigate("/auth");

    socket.on("authenticated", (data) => {
      console.log("authenticated");
      setMe(data);
      navigate("/home");
    });

    socket.on("joinRoom", () => navigate("/game"));

    return () => {
      socket.off("authenticated");
      socket.off("joinRoom");
    };
  }, []);

  const connectionCheck =
    (func) =>
    (...args) => {
      if (socket.connected) {
        func(...args);
      } else {
        alert("Not connected to the server!");
      }
    };

  return (
    <Routes>
      <Route path="/auth" element={<Auth store={store} />} />
      <Route
        path="/ratings"
        element={<Ratings socket={socket} goHome={() => navigate("/home")} />}
      />
      <Route
        path="/home"
        element={
          <Home
            name={me.name}
            connectionCheck={connectionCheck}
            socket={socket}
            store={store}
            navigate={navigate}
          />
        }
      />
      <Route path="/queue" element={<h1>Waiting...</h1>} />
      <Route
        path="/game"
        element={
          <Game
            name={me.name}
            socket={socket}
            connectionCheck={connectionCheck}
            navigate={navigate}
          />
        }
      />
    </Routes>
  );
};

export default observer(App);

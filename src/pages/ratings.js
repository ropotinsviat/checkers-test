import { useState, useEffect } from "react";
import "../styles/userRatings.css";

function Ratings({ socket, goHome }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("getRatings", (callback) => {
      callback.sort((a, b) => b.score - a.score);
      setUsers(callback);
      /*const users = [
        { name: "Alice", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Bob", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Charlie", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "David", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Eve", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Frank", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Grace", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Henry", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Ivy", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Jack", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Katie", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Liam", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Mia", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Nora", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Oliver", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Penelope", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Quinn", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Ryan", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Sophia", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Thomas", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Ursula", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Vincent", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Wendy", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Xander", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Yara", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Zach", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Abigail", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Benjamin", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Chloe", score: Math.floor(Math.random() * 1000) + 1 },
        { name: "Daniel", score: Math.floor(Math.random() * 1000) + 1 },
      ];
      users.sort((a, b) => b.score - a.score);
      setUsers(users);*/
    });
  }, []);

  return (
    <div className="user-ratings-container">
      <div className="back-button-wrapper">
        <input type="button" value="Back" onClick={goHome} />
      </div>
      <div className="box">
        <h2>Ratings</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="user-item">
              <span>{index + 1}</span>
              <div className="user-info">
                <div>{user.name}</div>
                <div>{user.score}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ratings;

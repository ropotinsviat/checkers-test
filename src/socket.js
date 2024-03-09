import io from "socket.io-client";

const socket = io("https://checkers-server.onrender.com", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socket;

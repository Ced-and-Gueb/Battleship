const express = require("express");
const http = require("http");
const app = express();
const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(__dirname + "/public"));

const state = {};
const clientRooms = {};

io.sockets.on("connection", (client) => {
  // When the "pinning" is triggered from the client, sends to the other clients
  client.on("pinning", (pinnedCoords) => {
    client.broadcast.emit("pinned", pinnedCoords);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("server listen on PORT:" + PORT);
});

const express = require("express");
const http = require("http");
const app = express();
const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.use(express.static(__dirname + "/public"));

io.sockets.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("pin", (pos) => {
    console.log(pos);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("server listen on PORT:" + PORT);
});

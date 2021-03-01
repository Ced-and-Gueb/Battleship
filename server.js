const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

app.use(express.static(__dirname + '/public'))

io.on("connection", (socket) => {
    socket.on("pos", (pos) => {
        console.log(pos);
    })
})

server.listen(3000, () => {
    console.log("server listen on PORT: 3000");
})
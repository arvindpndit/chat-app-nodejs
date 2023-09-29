const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const connect = require("./config/database-config");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    //console.log("a user connected", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data.roomId);
    });

    socket.on("msg_send", (data) => {
        console.log(data);
        io.to(data.roomId).emit("msg_received", data);
    });
});

app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomId", (req, res) => {
    res.render("index", {
        name: "Arvind",
        roomId: req.params.roomId,
    });
});

server.listen(3000, async () => {
    console.log("Server started @ 3000");
    await connect();
    console.log("mongodb connected");
});

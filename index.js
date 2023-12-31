const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const connect = require("./config/database-config");

const Chat = require("./models/chat");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    //console.log("a user connected", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data.roomId);
    });

    socket.on("msg_send", async (data) => {
        console.log(data);

        const chat = await Chat.create({
            roomId: data.roomId,
            user: data.user,
            content: data.msg,
        });

        io.to(data.roomId).emit("msg_received", data);
    });

    socket.on("typing", (data) => {
        io.to(data.roomId).emit("someone_typing");
    });
});

app.set("view engine", "ejs");
app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomId", async (req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomId,
    }).select("content user");
    console.log(chats);
    res.render("index", {
        name: "Arvind",
        roomId: req.params.roomId,
        chats: chats,
    });
});

server.listen(3000, async () => {
    console.log("Server started @ 3000");
    await connect();
    console.log("mongodb connected");
});

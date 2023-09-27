var socket = io();

const btn = document.getElementById("btn");
btn.onclick = () => {
    socket.emit("from_client");
};

socket.on("from_server", () => {
    console.log("from server to client");
});

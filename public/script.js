var socket = io();

const btn = document.getElementById("btn");
const msg = document.getElementById("newmsg");
const msgList = document.getElementById("msglist");

btn.onclick = () => {
    socket.emit("msg_send", {
        msg: msg.value,
    });
};

socket.on("msg_received", (data) => {
    let msgItem = document.createElement("li");
    msgItem.innerText = data.msg;
    msgList.appendChild(msgItem);
});

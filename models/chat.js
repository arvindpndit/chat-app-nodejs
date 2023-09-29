const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    user: {
        type: String,
    },
    user2: {
        type: String,
    },
    roomId: {
        type: String,
    },
});

const chat = mongoose.model("Chat", chatSchema);
module.exports = chat;

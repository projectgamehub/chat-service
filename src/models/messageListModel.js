import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    senderId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const messageListSchema = new mongoose.Schema({
    messages: [messageSchema]
});

const MessageList = mongoose.model("MessageList", messageListSchema);

export default MessageList;

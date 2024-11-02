import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    senderId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const messageListSchema = new mongoose.Schema({
    user1Id: { type: String, required: true },
    user2Id: { type: String, required: true },
    messages: [messageSchema],
    lastMessage: { type: String },
    lastMessageTimestamp: { type: Date }
});

const MessageList = mongoose.model("MessageList", messageListSchema);

export default MessageList;

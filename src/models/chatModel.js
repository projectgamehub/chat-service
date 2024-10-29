import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    chats: [
        {
            otherUserId: { type: String, required: true },
            lastMessage: { type: String },
            lastMessageTimestamp: { type: Date },
            messageListId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MessageList"
            }
        }
    ]
});

const Chats = mongoose.model("Chat", chatSchema);

export default Chats;

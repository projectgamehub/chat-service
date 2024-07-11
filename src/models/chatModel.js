import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        isGroup: {
            type: Boolean,
            default: false
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

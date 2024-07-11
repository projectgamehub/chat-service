import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId
        },
        content: {
            type: String,
            trim: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

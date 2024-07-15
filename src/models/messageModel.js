import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            trim: true,
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

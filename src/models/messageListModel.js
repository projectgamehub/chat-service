import mongoose from "mongoose";

const messageListSchema = new mongoose.Schema(
    {
        user1Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        user2Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        messages: [
            {
                content: {
                    type: String,
                    trim: true,
                    required: true
                },
                senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                time: {
                    type: Date,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

const MessageList = mongoose.model("MessageList", messageListSchema);

export default MessageList;

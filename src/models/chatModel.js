import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        chattedWith: [
            {
                chattedWithId: {
                    type: mongoose.Schema.Types.ObjectId
                },
                lastMessage: {
                    type: String
                },
                lastMessageTime: {
                    type: Date
                }
            }
        ],
        timestamps: true
    }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

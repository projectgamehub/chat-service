import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        chattedWith: [
            {
                messageListId: {
                    type: mongoose.Schema.Types.ObjectId
                },
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
        ]
    },
    {
        timestamps: true
    }
);

const Chats = mongoose.model("Chats", chatsSchema);

export default Chats;

import Chat from "../models/chatModel.js";

class ChatRepository {
    async findChatsByUserId(userId) {
        return Chat.findOne({ userId }).populate("chats.messageListId");
    }

    async findChatBetweenUsers(userId, otherUserId) {
        return Chat.findOne({
            userId,
            "chats.otherUserId": otherUserId
        }).populate("chats.messageListId");
    }

    async createOrUpdateChat(
        userId,
        otherUserId,
        lastMessage,
        timestamp,
        messageListId
    ) {
        const chat = await Chat.findOneAndUpdate(
            { userId, "chats.otherUserId": otherUserId },
            {
                $set: {
                    "chats.$.lastMessage": lastMessage,
                    "chats.$.lastMessageTimestamp": timestamp
                }
            },
            { new: true }
        );

        if (!chat) {
            return Chat.updateOne(
                { userId },
                {
                    $push: {
                        chats: {
                            otherUserId,
                            lastMessage,
                            lastMessageTimestamp: timestamp,
                            messageListId
                        }
                    }
                },
                { upsert: true }
            );
        }

        return chat;
    }
}

export default new ChatRepository();

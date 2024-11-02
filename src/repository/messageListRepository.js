import MessageList from "../models/messageListModel.js";

class MessageListRepository {
    // async findMessagesByMessageListId(messageListId) {
    //     const messageList = await MessageList.findById(messageListId);
    //     return messageList ? messageList.messages : [];
    // }

    // async createNewMessageList(initialMessage) {
    //     const newMessageList = new MessageList({ messages: [initialMessage] });
    //     return await newMessageList.save();
    // }

    // async addMessageToMessageList(messageListId, message) {
    //     return MessageList.findByIdAndUpdate(
    //         messageListId,
    //         { $push: { messages: message } },
    //         { new: true }
    //     );
    // }

    async findMessageListByUsers(user1Id, user2Id) {
        return MessageList.findOne({
            $or: [
                { user1Id, user2Id },
                { user1Id: user2Id, user2Id: user1Id }
            ]
        });
    }

    async createNewMessageList(data) {
        const newMessageList = new MessageList(data);
        return await newMessageList.save();
    }

    async addMessageToMessageList(messageListId, message) {
        return MessageList.findByIdAndUpdate(
            messageListId,
            { $push: { messages: message } },
            { new: true }
        );
    }

    async updateLastMessage(messageListId, lastMessage, lastMessageTimestamp) {
        return MessageList.findByIdAndUpdate(
            messageListId,
            { lastMessage, lastMessageTimestamp },
            { new: true }
        );
    }

    async findAllChatsForUser(userId) {
        return MessageList.find({
            $or: [{ user1Id: userId }, { user2Id: userId }]
        }).select("user1Id user2Id lastMessage lastMessageTimestamp");
    }
}

export default new MessageListRepository();

import MessageList from "../models/messageListModel.js";

class MessageListRepository {
    async createMessageList(message) {
        const newMessageList = new MessageList({ messages: [message] });
        return newMessageList.save();
    }

    async addMessage(messageListId, message) {
        return MessageList.findByIdAndUpdate(
            messageListId,
            { $push: { messages: message } },
            { new: true }
        );
    }
}

export default new MessageListRepository();

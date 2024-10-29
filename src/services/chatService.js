import chatRepository from "../repository/chatRepository.js";
import messageListRepository from "../repository/messageListRepository.js";

class ChatService {
    async getChats(userId) {
        const chat = await chatRepository.findChatsByUserId(userId);

        return chat
            ? chat.chats.map((c) => ({
                  otherUserId: c.otherUserId,
                  lastMessage: c.lastMessage,
                  lastMessageTimestamp: c.lastMessageTimestamp
              }))
            : [];
    }

    async getConversation(userId, otherUserId) {
        const chat = await chatRepository.findChatBetweenUsers(
            userId,
            otherUserId
        );
        return chat ? chat.chats[0].messageListId.messages : [];
    }

    async sendMessage(userId, otherUserId, messageContent) {
        const timestamp = new Date();
        const message = {
            content: messageContent,
            senderId: userId,
            timestamp
        };

        let chat = await chatRepository.findChatBetweenUsers(
            userId,
            otherUserId
        );

        if (!chat) {
            const newMessageList =
                await messageListRepository.createMessageList(message);
            await chatRepository.createOrUpdateChat(
                userId,
                otherUserId,
                messageContent,
                timestamp,
                newMessageList._id
            );
            await chatRepository.createOrUpdateChat(
                otherUserId,
                userId,
                messageContent,
                timestamp,
                newMessageList._id
            );
        } else {
            await messageListRepository.addMessage(
                chat.chats[0].messageListId,
                message
            );
            await chatRepository.createOrUpdateChat(
                userId,
                otherUserId,
                messageContent,
                timestamp,
                chat.chats[0].messageListId
            );
            await chatRepository.createOrUpdateChat(
                otherUserId,
                userId,
                messageContent,
                timestamp,
                chat.chats[0].messageListId
            );
        }
    }
}

export default new ChatService();

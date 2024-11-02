import messageListRepository from "../repository/messageListRepository.js";

class ChatService {
    async getChats(userId) {
        const chat = await messageListRepository.findAllChatsForUser(userId);
        return chat || [];
    }

    async getConversation(userId, otherUserId) {
        // Find the MessageList document directly based on user1Id and user2Id
        const messageList = await messageListRepository.findMessageListByUsers(
            userId,
            otherUserId
        );

        // If no MessageList document is found, return an empty array
        if (!messageList) {
            return [];
        }

        // Return the messages array from the found MessageList document
        return messageList.messages;
    }

    async sendMessage(userId, otherUserId, messageContent) {
        const timestamp = new Date();
        const message = {
            content: messageContent,
            senderId: userId,
            timestamp
        };

        // Find or create a MessageList between the two users
        let messageList = await messageListRepository.findMessageListByUsers(
            userId,
            otherUserId
        );

        if (!messageList) {
            // Create a new MessageList if one doesn't exist between userId and otherUserId
            messageList = await messageListRepository.createNewMessageList({
                user1Id: userId,
                user2Id: otherUserId,
                messages: [message],
                lastMessage: messageContent,
                lastMessageTimestamp: timestamp
            });
        } else {
            // If MessageList exists, add the new message and update lastMessage and timestamp
            await messageListRepository.addMessageToMessageList(
                messageList._id,
                message
            );
            await messageListRepository.updateLastMessage(
                messageList._id,
                messageContent,
                timestamp
            );
        }

        return message;
    }
}

export default new ChatService();

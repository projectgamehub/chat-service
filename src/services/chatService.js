// TODO- Make Repo

import ChatRepository from "../repository/chatRepository.js";

class ChatService {
    constructor() {
        this.chatRepository = new ChatRepository();
    }

    async getChats(userId) {
        const chats = await this.chatRepository.getChats(userId);
        if (!chats) {
            return [];
        }
        return chats;
    }
}

export default ChatService;

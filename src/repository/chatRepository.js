import Chats from "../models/chatModel.js";

class ChatRepository {
    async getChats(userId, getFields = "") {
        return await Chats.findOne({ userId }, getFields);
    }
}

export default ChatRepository;

import { customError } from "../../errors/errorUtils/index.js";
import chatService from "../../services/chatService.js";

const getConversation = async (req, res) => {
    const userId = req.senderId;

    if (!userId) {
        throw new customError(400, "User Id is required");
    }

    const otherUserId = req.params.userId;

    const messages = await chatService.getConversation(userId, otherUserId);

    return res.status(200).json({
        message: "Messages retrieved successfully",
        messages,
        success: true
    });
};

export default getConversation;

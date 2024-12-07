import axios from "axios";
import { USER_SERVICE_URL } from "../../config/index.js";
import { customError } from "../../errors/errorUtils/index.js";
import chatService from "../../services/chatService.js";

const sendMessage = async (req, res) => {
    const userId = req.senderId;

    if (!userId) {
        throw new customError(400, "User Id is required");
    }

    const otherUserId = req.params.userId;

    try {
        await axios.get(USER_SERVICE_URL + "/get-username-by-id/" + otherUserId);
    } catch (error) {
        throw new customError(
            400,
            error?.response?.data?.message || "UserId is invalid"
        );
    }

    const { messageContent } = req.body;
    if (!messageContent) {
        throw new customError(400, "Message is required");
    }

    await chatService.sendMessage(userId, otherUserId, messageContent);

    return res.status(201).json({
        message: "Message sent successfully",
        success: true
    });
};

export default sendMessage;

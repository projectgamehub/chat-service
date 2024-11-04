import chatService from "../services/chatService.js";
import verifyAccessTokenForSocket from "./verifyAccessTokenForSocket.js";

const socketHandler = (io) => {
    io.on("connection", (socket) => {
        socket.on("join-room", async (data, callback) => {
            const { accessToken } = data;

            // Verify access token and get userId
            const userId = await verifyAccessTokenForSocket(accessToken);
            if (!userId) {
                return callback({ error: true, message: "Access Token Error" });
            }

            // Join the room with id = userId
            socket.join(userId);
            callback({ error: false, message: `Joined room ${userId}` });
        });

        socket.on("send-message", async (data, callback) => {
            const { messageContent, accessToken, otherUserId } = data;

            const senderId = await verifyAccessTokenForSocket(accessToken);
            if (!senderId) {
                return callback({ error: true, message: "Access Token Error" });
            }

            try {
                await chatService.sendMessage(
                    senderId,
                    otherUserId,
                    messageContent
                );
                io.to(otherUserId).emit("receive-message", {
                    senderId,
                    messageContent,
                    timestamp: new Date()
                });
                callback({ error: false });
            } catch (error) {
                console.error("Error sending message:", error.message);
                callback({ error: true, message: "Sending Message Error" });
            }
        });

        socket.on("disconnect", () => {
            // TODO - Can be use for updating user online status and last active status
        });
    });
};

export default socketHandler;

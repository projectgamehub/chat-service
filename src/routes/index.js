import express from "express";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import { asyncEventHandler } from "../errors/errorUtils/index.js";
import { verifyAccessToken } from "../middleware/index.js";
import {
    getChats,
    getConversation,
    sendMessage
} from "../controllers/index.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({ pong: "Hlo from the chat service" });
});

// Write all the routes which requires Access Token Below this

router.use(verifyAccessToken);

router.get("/get-chats", asyncEventHandler(getChats));

router.get("/get-conversation/:userId", asyncEventHandler(getConversation));

router.post("/send-message/:userId", asyncEventHandler(sendMessage));

router.use(errorMiddleware);

export default router;

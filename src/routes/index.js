import express from "express";
import { errorMiddleware } from "../errors/errorMiddlewares/index.js";
import { asyncEventHandler } from "../errors/errorUtils/index.js";

const router = express.Router();

router.get("/ping", (req, res) => {
    res.send({ pong: "Hlo from the chat service" });
});

router.use(errorMiddleware);

export default router;
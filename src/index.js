import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { PORT } from "./config/index.js";
import { connectWithDB, socketHandler } from "./utils/index.js";
import { Server as SocketIO } from "socket.io";

const app = express();

// TODO Configure this later
app.use(cors());

// TODO Add Limit on this
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

const server = app.listen(PORT, async () => {
    console.log("Listening on port: ", PORT);

    connectWithDB().catch(() => {
        console.log("Error connecting MongoDB");
    });
});

// TODO Configure this CORS later
const io = new SocketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

socketHandler(io);

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection ${err.name} occurred`);
    server.close(() => {
        process.exit(1);
    });
});

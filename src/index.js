import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { NODE_ENV, PORT } from "./config/index.js";
import { connectWithDB, socketHandler } from "./utils/index.js";
import { Server as SocketIO } from "socket.io";
import https from "https";
import fs from "fs";

const app = express();

// TODO Configure this later
app.use(cors());

// TODO Add Limit on this
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

const sslOptions =
    NODE_ENV === "production"
        ? {
            key: fs.readFileSync("./certs/privkey.pem"),
            cert: fs.readFileSync("./certs/fullchain.pem"),
        }
        : {
            key: fs.readFileSync("./certs/localhost-key.pem"),
            cert: fs.readFileSync("./certs/localhost-cert.pem"),
        };

const server = https.createServer(sslOptions, app);

server.listen(PORT, async () => {
    console.log("HTTPS server listening on port: ", PORT);

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

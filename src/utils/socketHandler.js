const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("connected to socket");
    });
};

export default socketHandler;

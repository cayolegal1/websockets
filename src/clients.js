const {io} = require('./index');

const clients = io.of("client");
clients.on("connection", (socket) => {
    socket.emit("welcome", {
        message: "welcome client", 
        role: "client"
    });
})
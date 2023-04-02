const {io} = require('./index');

const admins = io.of("admin");
admins.on("connection", (socket) => {
    socket.emit("welcome", {
        message: "welcome admin", 
        role: "admin"
    });
})
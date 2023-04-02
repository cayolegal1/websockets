const path = require("path");

/* servidor de socket.io */
const {Server} = require("socket.io");

const express = require("express");

/* método para crear nuevo servidor del módulo http, porque socket io no maneja solicitudes http directamente */
const {createServer} = require("http");
const app = express();

/* instancia del servidor pasando como parámetro express */
const httpServer = createServer(app);

/* instancia del server de socket.io, que recibe en el constructor un server, en nuestro caso tiene que ser http */
const io = new Server(httpServer);


app.use("/view", express.static("views"));

io.on("connection", (socket) => {
    io.emit("show_user_connection", `${socket.id} acaba de conectarse`);

    socket.connectedRoom = null;
    socket.on("channel_join", (channel) => {
        if(socket.connectedRoom) {
          socket.leave(socket.connectedRoom);
        }
        socket.join(channel);
        socket.connectedRoom = channel;
    });

    socket.on("message", (receivedMessage) => {
        io.to(socket.connectedRoom).emit("message", {
            channel: socket.connectedRoom, 
            message: receivedMessage
        });
    })

});

httpServer.listen(3030)
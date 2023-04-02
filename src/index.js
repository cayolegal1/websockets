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

const admins = io.of("admin");
const clients = io.of("client");

admins.on("connection", (socket) => {
    socket.emit("welcome", {
        message: "welcome admin", 
        role: "admin"
    });
})

clients.on("connection", (socket) => {
    socket.emit("welcome", {
        message: "welcole client",
        role: "client"
    });
})


httpServer.listen(3030)
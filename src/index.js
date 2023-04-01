const path = require("path");

/* servidor de socket.io */
const {Server} = require("socket.io");

const express = require("express");

/* método para crear nuevo servidor del módulo http, porque socket io no maneja solicitudes http directamente */
const {createServer} = require("http");
const app = express();

/* instancia del servidor pasando como parámetro express */
const httpServer = createServer(app);

/* instancia del server de socket.io, que recibe en el constructor un server, en nuestro casi tiene que ser http */
const io = new Server(httpServer);


app.use("/view", express.static("views"));


io.on("connection", (socket) => {
    console.log("socket Id: ", socket.id);
    socket.emit("welcome", "Welcome to our app!");
    socket.on("gratitude", (data) => {console.log(data)});
    socket.on("greeting", (data) => console.log(data));

    /* recibiendo el evento de circle move y emitiendo el valor que nos llega a todos */
    socket.on("circle_move", (data) =>  {
        io.emit("circle position", data)
    })
    io.emit("show_user_connection", `${socket.id} acaba de conectarse`);
});

httpServer.listen(3030)
/* configuración del modo debug, para que solamente los logs relacionados a estas entidades aparezcan */
// process.env.DEBUG = "engine, socket.io:socket, socket.io:client";

/* admin-ui */
const {instrument} = require("@socket.io/admin-ui");

/* middlewares */
const {authorizationMiddleware, loggerMiddleware} = require('./middlewares');

/* servidor de socket.io */
const {Server} = require("socket.io");

const express = require("express");

/* método para crear nuevo servidor del módulo http, porque socket io no maneja solicitudes http directamente */
const {createServer} = require("http");
const app = express();

/* instancia del servidor pasando como parámetro express */
const httpServer = createServer(app);

/* instancia del server de socket.io, que recibe en el constructor un server, en nuestro caso tiene que ser http */
const io = new Server(httpServer, {
  cors: {origin: ["https://admin.socket.io"], credentials: true},
});

instrument(io, {auth: false});

/* middleware para verificar si esta autorizado */
io.use(authorizationMiddleware);

/* middleware para mostrar y lanzar errores */
// io.use(loggerMiddleware);

app.use("/view", express.static("views"));


io.on("connection", (socket) => {
    try {
        console.log("socket id", socket.id);
    } catch(error) {console.log(error)}
})




httpServer.listen(3030)
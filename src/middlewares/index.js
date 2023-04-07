const authorizationMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    if(token === "Hello world") {
        return next();
    }
    const error = new Error("Not authorized");
    error.data = {status: 401,  message: "For this feature you must be an admin"};
    next(error);
}

const loggerMiddleware = (socket, next) => {
    console.log("aa")
    console.log(socket.error);
    throw socket.error;
}

module.exports = {
    authorizationMiddleware, 
    loggerMiddleware,
}
const client = io({
    auth: {
        token: "Hello world"
    }
});


client.on("connection", (socket) => {
    console.log(socket.id)
})

client.on("connect_error", error => {
    console.error(error);
    console.log(error.data);
    alert(JSON.stringify(error.data))
})

client.emit("test", {test: true})

client.on("test", msg => {
    console.log(msg);
    client.emit("jeje", "hola hola")
})



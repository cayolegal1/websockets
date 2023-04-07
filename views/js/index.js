const client = io({
    auth: {
        token: "Hello worldd"
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

client.on("test", msg => console.log(msg))



const client = io();

client.on("connect", () => {
    console.log("client connected: ", client.id);
});

client.io.on("reconnect_attempt", () => {
    console.log("trying to reconnect"); 
});

client.io.on("reconnect", () => {
    console.log("reconnected");
});

client.on("show_user_connection", (res) => {
    const p = document.createElement('p');
    p.textContent = res;
    document.body.appendChild(p);
})

document.querySelectorAll("button").forEach(b => {  
    b.addEventListener("click", (e) => {
        client.emit("channel_join", e.target.id);
    })
})

document.getElementById("message").addEventListener("click", () => {
    const message = prompt("Send your message: ");
    client.emit("message", message);
})

client.on("message", (receivedMessage) => {
    const newMessage = document.createElement("p");
    newMessage.textContent = receivedMessage?.message;
    document.querySelector(`.${receivedMessage?.channel}`).appendChild(newMessage);
})






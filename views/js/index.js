const client = io();
const text = document.getElementById("welcome");
const circle = document.getElementById("circle");
const button = document.querySelector("button");

client.on("connect", () => {
    console.log("client connected: ", client.id);
    client.emit("gratitude", "thanks for the amazing welcome!")
});

client.on("welcome", (res) => {
    text.textContent = res;
})

client.io.on("reconnect_attempt", () => {
    text.textContent = "Trying to reconnect..."
});

client.io.on("reconnect", () => {
    console.log("reconnected");
    text.textContent = "Reconnected!"
});

client.on("show_user_connection", (res) => {
    const p = document.createElement('p');
    p.textContent = res;
    document.body.appendChild(p);
    console.log('another connection: ', res)
})

client.on("circle position", (position) => {
    circle.style.top = position?.top;
    circle.style.left = position?.left;
})


const handleDrag = (e) => {
    const clientY = e.clientY + "px";
    const clientX = e.clientX + "px";
    circle.style.top = clientY;
    circle.style.left = clientX;
    client.emit("circle_move", {top: clientY, left: clientX})
    
}

circle.addEventListener("mousedown", (e) => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", () => document.removeEventListener("mousemove", handleDrag));
})

button.addEventListener("click", () =>  client.emit("greeting", "hello server!"));


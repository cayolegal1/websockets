const promptRole = prompt("Choose your role");
const socket = io(`/${promptRole}`);



socket.on("connect", () => {
    console.log(`Client connected ${socket.id}`)
})

socket.on("welcome", (res) => {
    console.log(res.message);
    document.getElementById("role").textContent = res.role;
})






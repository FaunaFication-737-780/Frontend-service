import { io } from "socket.io-client";

const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log(event, args);
});


io.on("connection", (socket) => {
    // notify existing users
    console.log("user connected");
});

module.exports = socket;
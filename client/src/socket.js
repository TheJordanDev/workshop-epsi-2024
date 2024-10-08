import { io } from "socket.io-client";
const URL = "http://localhost:3000"; // Replace with your server URL
const socket = io(URL, {
  autoConnect: false,
  reconnectionDelay: 10000, // defaults to 1000
  reconnectionDelayMax: 10000 // defaults to 5000
});
export default socket;
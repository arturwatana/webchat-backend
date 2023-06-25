import { io } from "./http";
import { randomUUID } from "node:crypto";
type Message = {
  text: string;
  username: string;
  id: string;
};
type User = {
  socketId: string;
  username: string;
};

const messages: Message[] = [];
const users: User[] = [];

io.on("connection", (socket) => {
  socket.on("username", (data: string) => {
    const newUser = {
      username: data,
      socketId: socket.id,
    };

    const userAlreadyConnected = users.find(
      (user) => user.username === newUser.username
    );
    if (userAlreadyConnected) {
      userAlreadyConnected.socketId = socket.id;
      return;
    }
    users.push(newUser);
  });
  socket.on("chat message", (data) => {
    const user = users.find((user) => user.username === data.username);
    if (!user) {
      console.log("User not found");
      return "not found";
    }
    const message: Message = {
      text: data.text,
      username: user.username,
      id: randomUUID(),
    };
    messages.push(message);
    io.emit("room message", messages);
  });
  socket.emit("get messages", messages);
});

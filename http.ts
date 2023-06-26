import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://webchat-seven-orpin.vercel.app"],
  })
);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://webchat-seven-orpin.vercel.app", "http://localhost:3000"],
  },
});
export { server, io };

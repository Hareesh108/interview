const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { join } = require("node:path");

const app = express();
app.use(cors());


app.get("/", (req, res) => {
  res.sendFile(join(__dirname,"websocket-client.html"));
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
  },
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // Welcome message to new user
  socket.emit("message", { text: `Welcome ${socket.id}!` });

  // Broadcast when a user connects
  socket.broadcast.emit("message", {
    text: `🟢 ${socket.id} joined the chat`,
  });

  // Listen for messages from clients
  socket.on("chatMessage", (data) => {
    console.log(`💬 ${socket.id}: ${data.text}`);

    // Broadcast message to all clients (including sender)
    io.emit("message", {
      text: `${socket.id}: ${data.text}`,
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
    io.emit("message", { text: `🔴 ${socket.id} left the chat` });
  });
});

// io.on("connection", (socket) => {
//   console.log("🔌 Client connected:", socket.id);

//   // Send initial message
//   socket.emit("message", { text: "Connected to WebSocket server!" });

//   // Send updates every 3 seconds
//   let counter = 0;
//   const interval = setInterval(() => {
//     counter++;
//     socket.emit("message", {
//       text: `Server event #${counter}`,
//       timestamp: new Date().toISOString(),
//     });
//   }, 3000);

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//     clearInterval(interval);
//   });
// });

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 WebSocket server running on http://localhost:${PORT}`));

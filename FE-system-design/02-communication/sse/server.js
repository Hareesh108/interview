const express = require("express");
const cors = require("cors");
const { join } = require("node:path");

const app = express();
app.use(cors());


app.get("/", (req, res) => {
  res.sendFile(join(__dirname,"index.html"));
});

// SSE endpoint
app.get("/sse", (req, res) => {
  console.log("Client connected");

  // Set headers to keep the connection open
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Send an initial message
  res.write(`data: Connected to SSE stream\n\n`);

  // Send periodic updates
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    const data = {
      message: `Server event #${counter}`,
      timestamp: new Date().toISOString(),
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 3000); // every 3 seconds

  // Handle client disconnect
  req.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`SSE server running at http://localhost:${PORT}`));

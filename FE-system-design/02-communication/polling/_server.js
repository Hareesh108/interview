const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from browser
app.use(express.json());

let dataCounter = 0; // Simulated data

// Long Polling endpoint
app.get('/long-polling', (req, res) => {
  console.log('Received request');

  // Simulate server delay (e.g., wait for new data)
  const delay = Math.floor(Math.random() * 5000) + 2000; // 2-7 seconds

  setTimeout(() => {
    dataCounter++;
    res.json({ message: `New data ${dataCounter}`, timestamp: new Date() });
  }, delay);
});

// Short Polling endpoint (optional)
app.get('/short-polling', (req, res) => {
  dataCounter++;
  res.json({ message: `Data ${dataCounter}`, timestamp: new Date() });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// vulnerable-server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simple "login" that sets an auth cookie
app.post('/login', (req, res) => {
  // In real life you'd verify credentials. Here we just set an auth cookie.
  res.cookie('auth', 'user123', { httpOnly: true });
  res.send('Logged in (cookie set)');
});

// Serve a legitimate transfer form (you can open this in browser)
app.get('/transfer-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'vulnerable-transfer-form.html'));
});

// Transfer endpoint (vulnerable)
app.post('/transfer', (req, res) => {
  const { to, amount } = req.body;
  if (!req.cookies.auth) return res.status(401).send('Unauthorized - not logged in');

  console.log(`[VULNERABLE] Transferred ${amount} to ${to}`);
  res.send(`Transferred ${amount} to ${to}`);
});

// Serve attacker page for convenience (optional)
app.get('/attacker', (req, res) => {
  res.sendFile(path.join(__dirname, 'attacker.html'));
});

app.listen(3000, () => console.log('Vulnerable server running at http://localhost:3000'));

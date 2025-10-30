// secure-server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize csurf. store secret in cookie (so we can embed token in forms)
const csrfProtection = csrf({ cookie: true });

// Fake login that sets auth cookie
app.post('/login', (req, res) => {
  res.cookie('auth', 'user123', { httpOnly: true });
  res.send('Logged in (cookie set)');
});

// Serve a transfer form that embeds the CSRF token
app.get('/transfer-form', csrfProtection, (req, res) => {
  // We'll use a tiny HTML template that includes the token in a hidden input
  const html = `
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><title>Bank — Transfer (Protected)</title></head>
      <body>
        <h1>Bank — Transfer (Protected with csurf)</h1>
        <form action="/transfer" method="POST">
          <input type="hidden" name="_csrf" value="${req.csrfToken()}">
          <label>To: <input name="to" value="friend-account"></label><br>
          <label>Amount: <input name="amount" value="1"></label><br>
          <button type="submit">Send</button>
        </form>

        <p><button onclick="fetch('/login', {method:'POST'}).then(r=>r.text()).then(alert)">Login (set cookie)</button></p>
      </body>
    </html>
  `;
  res.send(html);
});

// Protected transfer route
app.post('/transfer', csrfProtection, (req, res) => {
  const { to, amount } = req.body;
  if (!req.cookies.auth) return res.status(401).send('Unauthorized - not logged in');

  console.log(`[PROTECTED] Transferred ${amount} to ${to}`);
  res.send(`Transferred ${amount} to ${to}`);
});

// Serve an attacker page for demonstration (will NOT have the correct CSRF token)
app.get('/attacker', (req, res) => {
  res.sendFile(path.join(__dirname, 'attacker-fix.html')); 
});

app.listen(3001, () => console.log('Secure server running at http://localhost:3001'));

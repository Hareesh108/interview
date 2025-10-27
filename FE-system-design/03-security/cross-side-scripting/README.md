# 🧩 Frontend Security Vulnerabilities & Mitigations

This project demonstrates **common frontend vulnerabilities** and their **mitigations** using simple HTML examples. It also includes real-world use cases and explains how **Next.js** helps prevent these issues.

---

---

## 🧩 Section 1: Vulnerabilities

### 1. 🧨 Cross-Site Scripting (XSS)

**Vulnerability:**

```html
<input id="xssInput" placeholder="Enter text" />
<button onclick="xssAttack()">Submit</button>
<div id="xssOutput"></div>

<script>
  function xssAttack() {
    document.getElementById("xssOutput").innerHTML =
      document.getElementById("xssInput").value;
  }
</script>
```

**Explanation:**
When user input is directly rendered into the DOM using `.innerHTML`, a malicious user can inject scripts like:

```html
<script>alert('Hacked!')</script>
```

This will execute arbitrary JavaScript in the browser.

**Real-World Example:**
In 2022, multiple web apps suffered XSS attacks due to unsanitized user comments being rendered in HTML directly.

---

### 2. 🔓 Cross-Site Request Forgery (CSRF)

**Vulnerability:**

```html
<form action="https://example-bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker_account" />
  <input type="hidden" name="amount" value="1000" />
  <input type="submit" value="Click for a free gift!" />
</form>
```

**Explanation:**
If a user is logged into their bank account, visiting this malicious page can trigger an unwanted transaction.

**Real-World Example:**
CSRF was found in older banking portals where cookies automatically authenticated requests.

---

### 3. 🧭 Clickjacking

**Vulnerability:**

```html
<iframe src="https://example-bank.com" width="800" height="600"></iframe>
<button style="position:absolute; top:250px; left:300px; opacity:0.1;">
  Click me
</button>
```

**Explanation:**
An attacker can overlay transparent elements to trick a user into clicking buttons on another site.

**Real-World Example:**
In 2015, clickjacking was used to trick users into “Liking” Facebook pages without consent.

---

### 4. 💾 Local Storage Data Leak

**Vulnerability:**

```html
<script>
  localStorage.setItem("token", "secret123");
  console.log("Stored Token:", localStorage.getItem("token"));
</script>
```

**Explanation:**
Sensitive tokens in localStorage can be accessed by XSS or browser extensions.

**Real-World Example:**
Attackers used browser extensions to steal access tokens from apps like Slack and GitHub.

---

### 5. 🕵️‍♂️ Insecure API Calls

**Vulnerability:**

```html
<script>
  fetch("http://insecure-api.com/data")
    .then(res => res.json())
    .then(data => console.log(data));
</script>
```

**Explanation:**
Using `http://` instead of `https://` exposes data to man-in-the-middle (MITM) attacks.

**Real-World Example:**
Many mobile and web apps leaked user data due to unencrypted HTTP calls in 2019–2020.

---

## 🛡️ Section 2: Mitigations

### ✅ 1. Prevent XSS

```html
<div id="safeOutput"></div>
<script>
  function sanitizeHTML(str) {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  }

  function safeRender() {
    const userInput = document.getElementById("xssInput").value;
    document.getElementById("safeOutput").innerHTML = sanitizeHTML(userInput);
  }
</script>
```

**Next.js Fix:**

* Automatically escapes user input in JSX.
* Example:

  ```jsx
  <div>{userInput}</div> // Escaped by default
  ```

---

### ✅ 2. Prevent CSRF

**Mitigation:**

* Use CSRF tokens.
* Add `SameSite` cookies and verify tokens on the server.

**Next.js Fix:**

* With frameworks like `NextAuth.js`, CSRF tokens are automatically handled in API routes.

---

### ✅ 3. Prevent Clickjacking

```html
<meta http-equiv="X-Frame-Options" content="DENY" />
```

**Next.js Fix:**

```js
// next.config.js
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [{ key: "X-Frame-Options", value: "DENY" }],
    },
  ];
}
```

---

### ✅ 4. Secure Local Storage

**Mitigation:**

* Never store JWT or secrets in localStorage.
* Use **HTTP-only cookies** instead.

**Next.js Fix:**

* Cookies are managed securely via API routes with `httpOnly: true` and `secure: true`.

---

### ✅ 5. Secure API Calls

```html
fetch("https://secure-api.com/data", { credentials: "include" });
```

**Next.js Fix:**

* Automatically serves content over HTTPS in production (Vercel).
* Uses `fetch()` with absolute URLs to same-origin APIs to prevent CORS leaks.

---

## 🌍 Real-World Integration with Next.js

| Vulnerability      | Mitigation in Next.js                     |
| ------------------ | ----------------------------------------- |
| XSS                | Automatic escaping in JSX                 |
| CSRF               | Handled via NextAuth or custom middleware |
| Clickjacking       | Secure headers via `next.config.js`       |
| Local Storage Leak | Use secure cookies                        |
| Insecure API       | Enforced HTTPS and CORS controls          |

---

## 🧪 How to Test

1. Open `index.html` in a browser.
2. Try typing `<script>alert('XSS')</script>` and see the effect.
3. Then test the **mitigation** version and observe that it safely displays as plain text.
4. Use DevTools → Network tab to inspect HTTP vs HTTPS requests.

---

## 📖 References

* [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
* [Next.js Security Docs](https://nextjs.org/docs/advanced-features/security)
* [Mozilla Developer Network (MDN) – Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---
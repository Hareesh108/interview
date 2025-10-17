# 🟢 User Activity Status System Design

## 📘 Overview

This document outlines the design and implementation approach for a **User Activity Status System** — a feature that tracks whether a user is **active (online)** or **inactive (offline)** in real time, similar to social media platforms like WhatsApp, Instagram, or Discord.

---

## 🎯 Goal

Enable real-time tracking of user activity across devices and display accurate **Online/Offline** status to other users.

---

## 🏗️ High-Level Architecture

**Components:**

1. **Frontend (Client):**

   * Sends heartbeats or presence updates to the server.
   * Listens for other users' activity changes via WebSocket.

2. **Backend (API + Presence Service):**

   * Handles user connections, updates user status, and broadcasts changes.
   * Stores and manages activity timestamps in a cache/database.

3. **Cache Layer (Redis):**

   * Maintains fast, real-time user presence states (e.g., active/inactive).

4. **Database (PostgreSQL / MongoDB):**

   * Stores user profiles and last activity timestamps for historical/reference purposes.

---

## ⚙️ Flow Diagram

```
[Client] --connect--> [WebSocket Server] --update--> [Redis Cache]
       ↕                                     ↕
  (Listen for updates)                (Expire keys on timeout)
```

---

## 🔄 Real-Time Presence Logic

1. **User connects:**

   * WebSocket connection is established.
   * Backend marks the user as `active` in Redis with a TTL (e.g., 60 seconds).

2. **Heartbeat:**

   * Every 30 seconds, the client sends a heartbeat event to keep the user marked as `active`.

3. **User disconnects or times out:**

   * If the WebSocket disconnects or TTL expires → mark user as `inactive`.
   * Update the `last_seen` timestamp in the database.

4. **Broadcast:**

   * When a user’s status changes, the server emits an event (e.g., `user_status_change`) to other connected clients.

---

## 🧠 Example Redis Schema

| Key                       | Value                    | TTL (seconds) |
| ------------------------- | ------------------------ | ------------- |
| `user:status:{userId}`    | `"active"`               | 60            |
| `user:last_seen:{userId}` | `"2025-10-17T18:15:00Z"` | —             |

---

## 💻 API Endpoints

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| `GET`  | `/users/:id/status` | Get current status and last seen  |
| `POST` | `/users/status`     | Manually update status (optional) |

---

## 🧩 Sample Payload

**Response:**

```json
{
  "userId": "u123",
  "status": "inactive",
  "lastSeen": "2025-10-17T18:15:00Z"
}
```

---

## 🧰 Tech Stack

| Layer              | Technology                   |
| ------------------ | ---------------------------- |
| Frontend           | React, WebSocket (Socket.IO) |
| Backend            | Node.js / Spring Boot        |
| Database           | PostgreSQL                   |
| Cache              | Redis                        |
| Realtime Transport | WebSocket / Socket.IO        |

---

## ⏱️ Status Timeout Strategy

| Condition           | Action                          |
| ------------------- | ------------------------------- |
| Client connected    | Set status to `active`          |
| No heartbeat in 60s | Set status to `inactive`        |
| WebSocket closed    | Immediately mark `inactive`     |
| Manual logout       | Mark `inactive` and clear cache |

---

## 🔒 Security Considerations

* Authenticate WebSocket connections using JWT.
* Prevent spoofing by verifying the connected user’s identity.
* Limit heartbeat frequency to avoid server overload.

---

## 🚀 Future Enhancements

* Add **“typing...”** or **“recording audio”** indicators.
* Support **multiple device sessions**.
* Include **Last Active within X minutes** analytics.
* Integrate **Push notifications** for active friends.

---

## ✅ Summary

By combining **WebSockets + Redis + periodic heartbeats**, this design ensures a fast, reliable, and scalable **User Activity Status System** that can handle real-time updates efficiently — suitable for any modern social or messaging platform.

---

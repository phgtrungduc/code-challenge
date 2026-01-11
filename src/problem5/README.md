# Real-Time Scoreboard API Module

## 1. Overview

This module is responsible for managing a real-time scoreboard that displays the top 10 users by score.

Users perform actions on the website, and upon successful completion of an action, the user's score is increased. The updated leaderboard is then broadcast in real time to all connected clients.

The backend service is the single source of truth for score calculation, ranking, and authorization.

---

## 2. Responsibilities

- Validate and process score-increasing actions
- Prevent unauthorized or malicious score manipulation
- Maintain a real-time top 10 leaderboard
- Push live scoreboard updates to connected clients
- Ensure data consistency and performance

---

## 3. System Components

- **Frontend (Web UI)**  
  Displays the scoreboard and listens for real-time updates.

- **API Server**  
  Handles authentication, score updates, leaderboard computation, and broadcasting.

- **Database**  
  Persistent storage for user data and scores (source of truth).

- **Redis**
  - **Sorted Set (ZSET)**: Stores user scores and rankings.
  - **Hash (HASH)**: Stores user display information (e.g., username, avatar).

- **Realtime Channel**  
  WebSocket (with Node.js we can use Socket.IO)

---

## 4. Data Model (Example)

### Database (Persistent)

#### **users** table
```sql
id          INT PRIMARY KEY
username    VARCHAR(255)
score       INT DEFAULT 0
```

#### **score_actions** table
```sql
id          INT PRIMARY KEY
user_id     INT
action_id   UUID UNIQUE
created_at  TIMESTAMP
```

*Used to prevent replay attacks and audit score changes.*

---

### Redis (In-Memory)

#### **Leaderboard (Sorted Set)**
```
Key:    leaderboard
Member: userId
Score:  user score
```

#### **User Info (Hash)**
```
Key:    user:{userId}
Fields:
  - username
  - avatar
```

*Redis contains all information required to render the leaderboard without querying the database.*

---

## 5. API Endpoints (Example)

### Increase User Score

**Endpoint:**
```http
POST /api/score/increase
```

**Headers:**
```http
Authorization: Bearer <JWT>
```

**Request Body:**
```json
{
  "actionId": "uuid"
}
```

**Behavior:**
- Authenticate user via JWT
- Validate `actionId` (single-use)
- Increase user score
- Trigger leaderboard recalculation

---

### Get Initial Top 10 Scoreboard

**Endpoint:**
```http
GET /api/scoreboard/top10
```

**Description:**  
Used only when the UI initially loads the page.

**Response:**
```json
[
  {
    "userId": "123",
    "username": "user1",
    "avatar": "https://...",
    "score": 1500
  },
  ...
]
```

---

## 6. Execution Flow

### Score Update Flow

1. **User performs an action** on the frontend
2. **Frontend sends request** `POST /api/score/increase` to the API server
3. **API server validates:**
   - Verifies JWT
   - Validates `actionId` (anti-replay)
   - Updates score in the database (transactional)
4. **API server updates Redis:**
   - `ZINCRBY leaderboard <delta> userId`
   - Ensure `user:{userId}` hash exists
5. **API server retrieves top 10** from Redis:
   - `ZREVRANGE leaderboard 0 9 WITHSCORES`
   - `HGETALL user:{id}` for each user
6. **API server broadcasts** the updated top 10 snapshot via realtime channel
7. **All connected clients** update the scoreboard UI

---

## 7. Realtime Behavior

- The frontend fetches the top 10 leaderboard **only once** on page load.
- Subsequent updates are received via **server-push** (WebSocket / SSE).
- Each realtime update contains a **full snapshot** of the top 10 leaderboard.
- The frontend **replaces** the current leaderboard with the received snapshot.
- The frontend does **not** perform sorting, ranking, or score calculations.

---

## 8. Security Considerations

- **Authentication**: All score update requests require a valid JWT.
- **Authorization**: Score values are determined exclusively by the backend.
- **Anti-Replay Protection**: Each `actionId` can only be processed once.
- **Rate Limiting**: Limits score update requests per user or IP.
- **Server-Side Validation**: The client cannot directly manipulate scores.

---

## 9. Performance Optimization

- **Redis ZSET** provides O(log N) complexity for score updates and range queries
- **Redis HASH** enables O(1) user info lookups
- **WebSocket** reduces overhead compared to polling
- **Full snapshot approach** simplifies client-side logic and ensures consistency

---

## 10. Failure Handling

- **Redis restart**: Leaderboard can be rebuilt from the database
- **Realtime disconnect**: Clients refetch top 10 on reconnection
- **Partial failure**: Database remains the source of truth
- **Transaction rollback**: Ensures data consistency on database errors

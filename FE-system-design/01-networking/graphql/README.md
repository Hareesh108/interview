# GraphQL

<https://studio.apollographql.com/org/hareesh-bhittams-team-mhwax1u4aga8ec/graphs>

## 🧩 What is GraphQL?

**GraphQL** is a **query language** for your API — created by Facebook — that lets clients define **exactly what data they need**, and nothing more.

Instead of multiple REST endpoints (`/users`, `/users/:id/posts`), you send one query to a single **GraphQL endpoint** (usually `/graphql`) describing the data shape you want, and the server returns exactly that shape in JSON.

### Example

**REST**

```http
GET /users/1
GET /users/1/posts
```

**GraphQL**

```graphql
{
  user(id: 1) {
    name
    posts {
      title
      comments {
        text
      }
    }
  }
}
```

✅ **Single request → precise response**

---

## 💡 Why GraphQL?

| Problem (with REST)                                              | Solution (with GraphQL)                      |
| ---------------------------------------------------------------- | -------------------------------------------- |
| **Over-fetching:** You get more data than needed.                | Query only the exact fields you need.        |
| **Under-fetching:** Need multiple API calls to get related data. | Fetch all related data in one query.         |
| **Versioning issues:** `/v1`, `/v2`, etc.                        | Schema evolves without breaking old clients. |
| **Rigid endpoints:** Each resource has a fixed shape.            | Flexible schema; clients decide shape.       |

### Real-World Example

* In REST: Mobile and web clients may need different response sizes, requiring new endpoints.
* In GraphQL: Both clients can query the same endpoint but select only the fields they need.

---

## 🧠 When to Use GraphQL

| Use Case                                                           | Suitability                |
| ------------------------------------------------------------------ | -------------------------- |
| ✅ **Complex data relationships** (users → posts → comments)        | Excellent                  |
| ✅ **Multiple frontend clients** (web, mobile, dashboard)           | Excellent                  |
| ✅ **Dynamic UI needs** (React components rendering different data) | Excellent                  |
| ⚠️ **Simple CRUD APIs**                                            | REST may be simpler        |
| ⚠️ **High-latency networks**                                       | Needs query optimization   |
| ❌ **Streaming or binary uploads**                                  | REST or gRPC better suited |

**Rule of Thumb:**

> Use GraphQL when your frontend teams frequently change data needs faster than backend teams can update REST endpoints.

---

## ⚙️ How GraphQL Works

### 1. **Schema Definition**

The **schema** defines your API — types, fields, and relationships.

```graphql
type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  author: User!
}

type Query {
  user(id: ID!): User
  posts: [Post!]!
}
```

### 2. **Query**

The client sends a **query** describing the data needed.

```graphql
query GetUser {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}
```

### 3. **Resolver Functions**

Resolvers are functions on the server that **fetch data** for each field.

```js
const resolvers = {
  Query: {
    user: (_, { id }) => db.users.findById(id),
  },
  User: {
    posts: (user) => db.posts.filter(p => p.authorId === user.id),
  },
};
```

### 4. **Response**

GraphQL returns **JSON with the same structure** as the query:

```json
{
  "data": {
    "user": {
      "name": "Hareesh",
      "posts": [
        { "title": "Learning GraphQL" }
      ]
    }
  }
}
```

---

## ⚡ How GraphQL Differs from REST

| Feature               | REST            | GraphQL                    |
| --------------------- | --------------- | -------------------------- |
| Endpoint per resource | Yes             | Single endpoint `/graphql` |
| Response shape        | Fixed           | Flexible                   |
| API versioning        | Manual (`/v1`)  | Schema evolves naturally   |
| Batch queries         | No              | Yes                        |
| Type system           | No              | Strongly typed             |
| Tooling               | Swagger/Postman | Apollo Studio, GraphiQL    |

---

## 🧰 GraphQL in React

1. **Client Library:** Use [`@apollo/client`](https://www.apollographql.com/docs/react/) or [`urql`](https://formidable.com/open-source/urql/).
2. **Define Queries:** Use `.graphql` or `gql` tags.
3. **Use Hooks:** Auto-generated hooks from your queries.
4. **Inspect Data:** Use [Apollo Studio](https://studio.apollographql.com/) (your dashboard).

### Example

```tsx
import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

function UserList() {
  const { data, loading } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  return data.users.map(u => <div key={u.id}>{u.name}</div>);
}
```

---

## 🧬 GraphQL Workflow (Client + Server)

```
Frontend (React)      <---->      GraphQL Server      <---->      Database
   |                                   |                             |
   |  Query (shape)                    |                             |
   |---------------------------------->|                             |
   |                                   | Run resolvers               |
   |                                   |---------------------------->|
   |                                   | Collect + return data       |
   |<----------------------------------|                             |
   |  JSON shaped like the query       |                             |
```

---

## 🧠 Key Concepts

| Concept           | Description                                   |
| ----------------- | --------------------------------------------- |
| **Query**         | Read data                                     |
| **Mutation**      | Modify data                                   |
| **Subscription**  | Real-time data                                |
| **Schema**        | Contract between client and server            |
| **Resolver**      | Function that resolves a field                |
| **Directive**     | Add behavior to queries (`@include`, `@skip`) |
| **Introspection** | Query the schema itself                       |
| **Fragment**      | Reusable piece of query                       |

---

## 🧭 Common Tools

| Purpose       | Tool                             |
| ------------- | -------------------------------- |
| Client        | Apollo Client / Urql / Relay     |
| Server        | Apollo Server / Yoga / Mercurius |
| Schema        | GraphQL SDL                      |
| Mocking       | MSW / Apollo MockedProvider      |
| Documentation | GraphiQL / Apollo Studio         |
| Codegen       | GraphQL Code Generator           |

---

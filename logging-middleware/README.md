# Logging Middleware

A reusable JavaScript logging utility for Node.js applications. It validates inputs, sends logs to a remote service, and throws descriptive errors when inputs or requests fail.

## Installation

```bash
npm install logging-middleware
```

## Usage

```js
import { Log } from "logging-middleware";

await Log("backend", "info", "controller", "User registration started");
```

The function can also be imported directly from the logger module:

```js
import { Log } from "./logger";
```

## Server (Proxy) Usage

The built-in server accepts POST requests and forwards them to the backend log API using the token in your environment. It reads values from `.env` when available.

Start the server:

```bash
npm start
```

Send a log to the server:

```bash
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -d '{"stack":"backend","level":"info","package":"service","message":"Boot completed"}'
```

Environment variables supported:

- `PORT` (default: 3000)
- `LOG_API_URL` (default: http://4.224.186.213/evaluation-service/logs)
- `LOG_API_TIMEOUT_MS` (optional)
- `LOG_API_TOKEN` (optional)
- `DEFAULT_BACKEND_PACKAGE` (optional)

## Folder Structure

```
logging-middleware/
├── src/
│   ├── logger.js
│   ├── constants.js
│   ├── validator.js
│   ├── server.js
│   └── index.js
├── package.json
└── README.md
```

## Examples

Controller:

```js
await Log("backend", "info", "controller", "User registration started");
```

Service:

```js
await Log("backend", "debug", "service", "Fetching user details");
```

Repository:

```js
await Log("backend", "error", "repository", "Database query failed");
```

Route:

```js
await Log("backend", "info", "route", "POST /users endpoint called");
```

Middleware:

```js
await Log("backend", "warn", "middleware", "JWT token missing");
```

## Express.js Integration

```js
import express from "express";
import { Log } from "logging-middleware";

const app = express();

app.use(async (req, res, next) => {
  try {
    await Log("backend", "info", "middleware", `${req.method} ${req.path}`);
  } catch (error) {
    console.error(error);
  }
  next();
});

app.get("/health", async (_req, res) => {
  await Log("backend", "info", "route", "GET /health endpoint called");
  res.status(200).json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## Error Handling Examples

Invalid inputs throw descriptive errors:

```js
try {
  await Log("backend", "verbose", "service", "Invalid level");
} catch (error) {
  console.error(String(error));
}
```

Network or API errors are wrapped with context:

```js
try {
  await Log("backend", "info", "service", "Attempting API call");
} catch (error) {
  console.error(String(error));
}
```

import express from "express";
import schedulerRoutes from "./routes/schedulerRoutes.js";
import { safeLog } from "./middleware/logger.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", schedulerRoutes);

app.use(async (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : "Unknown error";
  await safeLog("backend", "error", "middleware", message);
  res.status(500).json({ error: message });
});

export default app;
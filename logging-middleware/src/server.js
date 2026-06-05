import "dotenv/config";
import express from "express";
import { Log } from "./logger.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/logs", async (req, res) => {
  const { stack, level, message } = req.body ?? {};
  let packageName = req.body?.package;

  if (!packageName && stack === "backend" && process.env.DEFAULT_BACKEND_PACKAGE) {
    packageName = process.env.DEFAULT_BACKEND_PACKAGE;
  }

  try {
    await Log(stack, level, packageName, message);
    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const statusCode = errorMessage.startsWith("Invalid ") ? 400 : 502;
    res.status(statusCode).json({ error: errorMessage });
  }
});

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

app.listen(port, () => {
  console.log(`Logging server listening on port ${port}`);
});

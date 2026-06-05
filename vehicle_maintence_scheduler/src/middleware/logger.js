import axios from "axios";
import env from "../config/env.js";

const ALLOWED_STACKS = ["backend", "frontend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];

export async function Log(stack, level, packageName, message) {
  if (!ALLOWED_STACKS.includes(stack)) {
    throw new Error(
      `Invalid stack: ${String(stack)}. Allowed: ${ALLOWED_STACKS.join(", ")}.`
    );
  }

  if (!ALLOWED_LEVELS.includes(level)) {
    throw new Error(
      `Invalid level: ${String(level)}. Allowed: ${ALLOWED_LEVELS.join(", ")}.`
    );
  }

  if (!packageName || typeof packageName !== "string") {
    throw new Error("Invalid package: package must be a non-empty string.");
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    throw new Error("Invalid message: message must be a non-empty string.");
  }

  const headers = env.logApiToken
    ? { Authorization: `Bearer ${env.logApiToken}` }
    : undefined;

  const config = {
    timeout: Number.isFinite(env.logApiTimeoutMs) ? env.logApiTimeoutMs : undefined,
    headers,
  };

  try {
    await axios.post(
      env.logApiUrl,
      { stack, level, package: packageName, message },
      config
    );
  } catch (error) {
    const status =
      axios.isAxiosError(error) && error.response
        ? error.response.status
        : undefined;
    const detail =
      axios.isAxiosError(error) && error.response
        ? JSON.stringify(error.response.data)
        : undefined;

    const statusMsg = status ? ` Status: ${status}.` : "";
    const detailMsg = detail ? ` Response: ${detail}.` : "";

    throw new Error(`Failed to send log.${statusMsg}${detailMsg}`);
  }
}
export async function safeLog(stack, level, packageName, message) {
  try {
    await Log(stack, level, packageName, message);
  } catch (error) {
    const logMessage = error instanceof Error ? error.message : "Unknown log error";
    console.warn(`SafeLog suppressed error: ${logMessage}`);
  }
}
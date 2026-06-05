import axios from "axios";
import { LOGGING_API_URL } from "./constants.js";
import { validateInputs } from "./validator.js";

function getLogRequestConfig() {
  const timeoutRaw = process.env.LOG_API_TIMEOUT_MS;
  const timeoutMs = Number.parseInt(timeoutRaw ?? "", 10);
  const token = process.env.LOG_API_TOKEN;

  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const timeout = Number.isFinite(timeoutMs) ? timeoutMs : undefined;

  return { headers, timeout };
}

export async function Log(stack, level, packageName, message) {
  validateInputs(stack, level, packageName, message);

  const apiUrl = process.env.LOG_API_URL || LOGGING_API_URL;
  const requestConfig = getLogRequestConfig();

  try {
    await axios.post(
      apiUrl,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      requestConfig
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

    const baseMessage = "Failed to send log to logging service.";
    const statusMessage = status ? ` Status: ${status}.` : "";
    const detailMessage = detail ? ` Response: ${detail}.` : "";

    throw new Error(`${baseMessage}${statusMessage}${detailMessage}`);
  }
}

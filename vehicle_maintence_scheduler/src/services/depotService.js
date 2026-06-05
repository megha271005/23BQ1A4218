import axios from "axios";
import env from "../config/env.js";
import { safeLog } from "../middleware/logger.js";
import { getAuthToken } from "./authService.js";

export async function fetchDepots() {
  if (!env.depotsUrl) {
    throw new Error("DEPOTS_URL is missing in environment configuration.");
  }

  const token = await getAuthToken();

  try {
    const response = await axios.get(env.depotsUrl, {
      headers: { Authorization: token },
    });

    const depots = response.data?.depots;

    if (!Array.isArray(depots)) {
      throw new Error("Depots response is missing 'depots' array.");
    }

    await safeLog("backend", "info", "service", "Depots fetched successfully");
    return depots;
  } catch (error) {
    await safeLog("backend", "error", "service", "Depots fetch failed");
    throw error;
  }
}
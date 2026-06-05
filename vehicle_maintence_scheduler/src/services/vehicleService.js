import axios from "axios";
import env from "../config/env.js";
import { safeLog } from "../middleware/logger.js";
import { getAuthToken } from "./authService.js";

export async function fetchVehicles() {
  if (!env.vehiclesUrl) {
    throw new Error("VEHICLES_URL is missing in environment configuration.");
  }

  const token = await getAuthToken();

  try {
    const response = await axios.get(env.vehiclesUrl, {
      headers: { Authorization: token },
    });

    const vehicles = response.data?.vehicles;

    if (!Array.isArray(vehicles)) {
      throw new Error("Vehicles response is missing 'vehicles' array.");
    }

    await safeLog("backend", "info", "service", "Vehicles fetched successfully");
    return vehicles;
  } catch (error) {
    await safeLog("backend", "error", "service", "Vehicles fetch failed");
    throw error;
  }
}
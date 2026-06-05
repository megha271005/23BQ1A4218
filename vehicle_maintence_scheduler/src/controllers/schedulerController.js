import { buildSchedule } from "../services/schedulerService.js";
import { safeLog } from "../middleware/logger.js";

export async function getSchedule(_req, res) {
  try {
    const schedules = await buildSchedule();
    res.status(200).json({ schedules });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await safeLog("backend", "error", "controller", message);
    res.status(500).json({ error: message });
  }
}
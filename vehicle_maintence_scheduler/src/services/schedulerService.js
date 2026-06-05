import { fetchDepots } from "./depotService.js";
import { fetchVehicles } from "./vehicleService.js";
import { knapsack } from "../algorithms/knapsack.js";
import { safeLog } from "../middleware/logger.js";

export async function buildSchedule() {
  const depots = await fetchDepots();
  const vehicles = await fetchVehicles();

  const schedules = depots.map((depot) => {
    const capacity = depot.MechanicHours;
    const result = knapsack(vehicles, capacity);

    return {
      depotId: depot.ID,
      capacity,
      totalImpact: result.totalImpact,
      totalDuration: result.totalDuration,
      selectedTasks: result.selected,
    };
  });

  await safeLog("backend", "info", "service", "Schedules computed successfully");
  return schedules;
}
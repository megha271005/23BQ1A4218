import app from "./app.js";
import env from "./config/env.js";
import { safeLog } from "./middleware/logger.js";

app.listen(env.port, async () => {
  await safeLog("backend", "info", "service", `Server running on port ${env.port}`);
  console.log(`Server running on port ${env.port}`);
});
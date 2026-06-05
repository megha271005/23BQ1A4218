import { Router } from "express";
import { getSchedule } from "../controllers/schedulerController.js";

const router = Router();

router.get("/route-check", (_req, res) => {
  res.status(200).json({ ok: true });
});

router.get("/schedule", getSchedule);

export default router;
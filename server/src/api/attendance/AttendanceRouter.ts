import { Router } from "express";
import { showAttandance, logAttandance, logClockOut } from "./AttendanceController";

const router = Router();

router.get("/", showAttandance);
router.post("/", logAttandance);
router.patch("/", logClockOut);

export default router;

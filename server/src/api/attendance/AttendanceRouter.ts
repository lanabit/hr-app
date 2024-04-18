import { Router } from "express";
import { showAttandance, logAttandance, logClockOut, logDeduction } from "./AttendanceController";

const router = Router();

router.get("/", showAttandance);

router.post("/", logAttandance);
router.patch("/", logClockOut);
router.get("/deduction", logDeduction);
export default router;

import { Router } from "express";
import { showAttandance, logAttandance } from "./AttendanceController";

const router = Router();

router.get("/", showAttandance);
router.post("/", logAttandance);

export default router;

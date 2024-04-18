import express, { Router } from "express";
import cors from "cors";
import EmployeeRouter from "../employee/EmployeeRouter";
import AttendanceRouter from "../attendance/AttendanceRouter";
import LeaveRequestRouter from "../leaveRequest/LeaveRequestRouter";
const router = Router();

router.use(cors());
router.use(express.json());
router.use("/employees", EmployeeRouter);
router.use("/attendance", AttendanceRouter);
router.use("/leaverequests", LeaveRequestRouter);

export default router;

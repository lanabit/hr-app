import express, { Router } from "express";
import EmployeeRouter from "../employee/EmployeeRouter";
import AttendanceRouter from "../attendance/AttendanceRouter";

const router = Router();
router.use(express.json());
router.use("/employees", EmployeeRouter);
router.use("/attendance", AttendanceRouter);

export default router;

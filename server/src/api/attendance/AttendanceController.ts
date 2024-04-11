import { Request, Response } from "express";
import { findAttendance, createAttendance } from "./AttendanceService";
import { findEmployeesById } from "../employee/EmployeeService";

export const showAttandance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const attendance = await findAttendance();
    res.send({
      status: "success",
      data: attendance,
    });
  } catch (error: any) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
};

export const logAttandance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employeeId = parseInt(req.headers.id as string);
    console.log(employeeId);
    const { date, clockIn, clockOut, isOnLeave, deduction } = req.body;

    await findEmployeesById(employeeId);
    const newAttendance = await createAttendance(
      employeeId,
      date,
      clockIn,
      clockOut,
      isOnLeave,
      deduction
    );

    res.send({
      status: "success",
      data: newAttendance,
    });
  } catch (error: any) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
};

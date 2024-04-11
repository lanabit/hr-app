const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { findEmployeesById } from "../employee/EmployeeService";

export const findAttendance = async () => {
  const attendance: any = await prisma.attendance.findMany();
  return attendance;
};

export const createAttendance = async (
  employeeId: number,
  date: string,
  clockIn: string,
  clockOut: string,
  isOnLeave: boolean,
  deduction: number
) => {
  const attendanceLog = await prisma.attendance.create({
    data: {
      employeeId: employeeId,
      date: date,
      clockIn: clockIn,
      clockOut: clockOut,
      isOnLeave: isOnLeave,
      deduction: deduction,
    },
  });

  return attendanceLog;
};

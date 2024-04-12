const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { findEmployeesById } from "../employee/EmployeeService";

export const findAttendance = async () => {
  const attendances: any = await prisma.attendance.findMany();
  return attendances;
};

export const findAttendancebyId = async (id: number) => {
  const attendance: any = await prisma.attendance.findUnique({
    where: {
      id,
    },
  });

  if (!attendance) throw new Error(`Attendance with id ${id} not found.`);
  return attendance;
};

export const createAttendance = async (
  employeeId: number,
  date: string,
  clockIn: string,
  clockOut: string | null,
  isOnLeave: boolean | null,
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

export const editAttendance = async (id: number, data: any) => {
  await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      clockOut: data.clockOut,
    },
  });

  return await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      deduction: await deductionLogic(id),
    },
  });
};

export const deductionLogic = async (id: number) => {
  const attendanceData = await findAttendancebyId(id);
  const attendant = await findEmployeesById(attendanceData.employeeId);
  const salary = attendant.position.salary;
  const shiftDetails = await prisma.shift.findUnique({
    where: {
      id: attendant.shiftId,
    },
  });

  const DateTransform = (dateData: any) => {
    dateData = JSON.stringify(dateData);
    dateData = dateData.slice(1, -3);
    return new Date(dateData);
  };

  const shiftStart = DateTransform(shiftDetails.start);
  const shiftEnds = DateTransform(shiftDetails.end);
  const clockIn = DateTransform(attendanceData.clockIn);
  const clockOut = DateTransform(attendanceData.clockOut);

  const denumerator = 1000 * 60; //milisecond to minute for getTime calculation

  const lateClockIn: number =
    clockIn.getTime() - shiftStart.getTime() > 0
      ? (clockIn.getTime() - shiftStart.getTime()) / denumerator
      : 0;

  const earlyClockOut: number =
    clockOut.getTime() - shiftEnds.getTime() < 0
      ? Math.abs(clockOut.getTime() - shiftEnds.getTime()) / denumerator
      : 0;

  const lostTime: number = Math.floor((lateClockIn + earlyClockOut) / 30);

  return lostTime * salary * 0.001;
};

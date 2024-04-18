const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const getLeaveRequests = async () => {
  const leaveRequests: any = await prisma.leaveRequest.findMany({
    include: {
      employee: {
        include: {
          shift: true,
        },
      },
    },
  });

  return leaveRequests;
};

export const getLeaveRequestsByEmployeeId = async (id: number) => {
  const leaveRequests: any = await prisma.leaveRequest.findUnique({
    where: {
      employeeId: id,
    },
    include: {
      employee: true,
    },
  });

  return leaveRequests;
};

export const getLeaveRequestsByRequestId = async (id: number) => {
  const leaveRequests: any = await prisma.leaveRequest.findUnique({
    where: {
      id: id,
    },
    include: {
      employee: {
        shift: true,
      },
    },
  });

  return leaveRequests;
};

export const createLeaveRequest = async (
  employeeId: number,
  type: string,
  startDate: string,
  endDate: string
) => {
  if (!(employeeId && type && startDate && endDate))
    throw new Error(`Some fields are missing.`);
  const newLeaveRequest = await prisma.leaveRequest.create({
    data: {
      employeeId: employeeId,
      type: type,
      startDate: startDate,
      endDate: endDate,
    },
  });

  return newLeaveRequest;
};

export const acceptLeaveRequest = async (
  id: number,
  isAccepted: boolean,
  employeeId: number,
  leaveBalance: number,
  totalDays: number,
  clockIn: string,
  clockOut: string,
  leaveDates: string[]
) => {
  if (!isAccepted) {
    const reqDenied = await prisma.leaveRequest.update({
      where: {
        id,
      },
      data: {
        status: 2,
      },
    });

    return reqDenied;
  }

  const reqAccepted = prisma.leaveRequest.update({
    where: {
      id,
    },
    data: {
      status: 1,
    },
  });

  const balanceReduction = prisma.employee.update({
    where: {
      id: employeeId,
    },
    data: {
      leaveBalance: leaveBalance - totalDays,
    },
  });

  const autoAttendanceData = leaveDates.map((date) => ({
    employeeId: employeeId,
    date: date,
    clockIn: clockIn,
    clockOut: clockOut,
    isOnLeave: true,
    deduction: 0,
  }));

  const autoAttendance = prisma.attendance.createMany({
    data: autoAttendanceData,
  });

  return prisma.$transaction([reqAccepted, balanceReduction, autoAttendance]);
};

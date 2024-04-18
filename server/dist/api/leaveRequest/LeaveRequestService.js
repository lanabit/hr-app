"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptLeaveRequest = exports.createLeaveRequest = exports.getLeaveRequestsByRequestId = exports.getLeaveRequestsByEmployeeId = exports.getLeaveRequests = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getLeaveRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const leaveRequests = yield prisma.leaveRequest.findMany({
        include: {
            employee: {
                include: {
                    shift: true,
                },
            },
        },
    });
    return leaveRequests;
});
exports.getLeaveRequests = getLeaveRequests;
const getLeaveRequestsByEmployeeId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const leaveRequests = yield prisma.leaveRequest.findUnique({
        where: {
            employeeId: id,
        },
        include: {
            employee: true,
        },
    });
    return leaveRequests;
});
exports.getLeaveRequestsByEmployeeId = getLeaveRequestsByEmployeeId;
const getLeaveRequestsByRequestId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const leaveRequests = yield prisma.leaveRequest.findUnique({
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
});
exports.getLeaveRequestsByRequestId = getLeaveRequestsByRequestId;
const createLeaveRequest = (employeeId, type, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(employeeId && type && startDate && endDate))
        throw new Error(`Some fields are missing.`);
    const newLeaveRequest = yield prisma.leaveRequest.create({
        data: {
            employeeId: employeeId,
            type: type,
            startDate: startDate,
            endDate: endDate,
        },
    });
    return newLeaveRequest;
});
exports.createLeaveRequest = createLeaveRequest;
const acceptLeaveRequest = (id, isAccepted, employeeId, leaveBalance, totalDays, clockIn, clockOut, leaveDates) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isAccepted) {
        const reqDenied = yield prisma.leaveRequest.update({
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
});
exports.acceptLeaveRequest = acceptLeaveRequest;

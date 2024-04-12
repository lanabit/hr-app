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
exports.deductionLogic = exports.editAttendance = exports.createAttendance = exports.findAttendancebyId = exports.findAttendance = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const EmployeeService_1 = require("../employee/EmployeeService");
const findAttendance = () => __awaiter(void 0, void 0, void 0, function* () {
    const attendances = yield prisma.attendance.findMany();
    return attendances;
});
exports.findAttendance = findAttendance;
const findAttendancebyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield prisma.attendance.findUnique({
        where: {
            id,
        },
    });
    if (!attendance)
        throw new Error(`Attendance with id ${id} not found.`);
    return attendance;
});
exports.findAttendancebyId = findAttendancebyId;
const createAttendance = (employeeId, date, clockIn, clockOut, isOnLeave, deduction) => __awaiter(void 0, void 0, void 0, function* () {
    const attendanceLog = yield prisma.attendance.create({
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
});
exports.createAttendance = createAttendance;
const editAttendance = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.attendance.update({
        where: {
            id,
        },
        data: {
            clockOut: data.clockOut,
        },
    });
    return yield prisma.attendance.update({
        where: {
            id,
        },
        data: {
            deduction: yield (0, exports.deductionLogic)(id),
        },
    });
});
exports.editAttendance = editAttendance;
const deductionLogic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const attendanceData = yield (0, exports.findAttendancebyId)(id);
    const attendant = yield (0, EmployeeService_1.findEmployeesById)(attendanceData.employeeId);
    const salary = attendant.position.salary;
    const shiftDetails = yield prisma.shift.findUnique({
        where: {
            id: attendant.shiftId,
        },
    });
    const DateTransform = (dateData) => {
        dateData = JSON.stringify(dateData);
        dateData = dateData.slice(1, -3);
        return new Date(dateData);
    };
    const shiftStart = DateTransform(shiftDetails.start);
    const shiftEnds = DateTransform(shiftDetails.end);
    const clockIn = DateTransform(attendanceData.clockIn);
    const clockOut = DateTransform(attendanceData.clockOut);
    const denumerator = 1000 * 60; //milisecond to minute for getTime calculation
    const lateClockIn = clockIn.getTime() - shiftStart.getTime() > 0
        ? (clockIn.getTime() - shiftStart.getTime()) / denumerator
        : 0;
    const earlyClockOut = clockOut.getTime() - shiftEnds.getTime() < 0
        ? Math.abs(clockOut.getTime() - shiftEnds.getTime()) / denumerator
        : 0;
    const lostTime = Math.floor((lateClockIn + earlyClockOut) / 30);
    return lostTime * salary * 0.001;
});
exports.deductionLogic = deductionLogic;

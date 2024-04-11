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
exports.createAttendance = exports.findAttendance = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const findAttendance = () => __awaiter(void 0, void 0, void 0, function* () {
    const attendance = yield prisma.attendance.findMany();
    return attendance;
});
exports.findAttendance = findAttendance;
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

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
exports.logClockOut = exports.logAttandance = exports.showAttandance = void 0;
const AttendanceService_1 = require("./AttendanceService");
const EmployeeService_1 = require("../employee/EmployeeService");
const showAttandance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendance = yield (0, AttendanceService_1.findAttendance)();
        res.send({
            status: "success",
            data: attendance,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.showAttandance = showAttandance;
const logAttandance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = parseInt(req.headers.id);
        const { date, clockIn, clockOut, isOnLeave, deduction } = req.body;
        yield (0, EmployeeService_1.findEmployeesById)(employeeId);
        const newAttendance = yield (0, AttendanceService_1.createAttendance)(employeeId, date, clockIn, clockOut, isOnLeave, deduction);
        res.send({
            status: "success",
            data: newAttendance,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.logAttandance = logAttandance;
const logClockOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = parseInt(req.headers.id);
        const data = req.body;
        const newAttendance = yield (0, AttendanceService_1.editAttendance)(attendanceId, data);
        res.send({
            status: "success",
            data: newAttendance,
        });
    }
    catch (error) {
        res.send({
            status: "error",
            message: error.message,
        });
    }
});
exports.logClockOut = logClockOut;
